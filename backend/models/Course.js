const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Le titre du cours est obligatoire'],
    trim: true,
    maxlength: [100, 'Le titre ne peut excéder 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
    maxlength: [500, 'La description ne peut excéder 500 caractères']
  },
  subject: {
    type: String,
    enum: ['Mathématiques', 'Physique', 'Informatique', 'Histoire', 'Langues', 'Autre'],
    default: 'Autre' // Subject is now optional with a default value
  },
  level: {
    type: String,
    enum: ['Débutant', 'Intermédiaire', 'Avancé'],
    default: 'Débutant'
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Un professeur doit être associé au cours'],
    validate: {
      validator: async function (userId) {
        const user = await mongoose.model('User').findById(userId);
        return user && user.userType === 'teacher';
      },
      message: 'L\'utilisateur spécifié n\'est pas un professeur'
    }
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async function (userIds) {
        const users = await mongoose.model('User').find({ _id: { $in: userIds } });
        return users.every(user => user.userType === 'student');
      },
      message: 'Seuls les étudiants peuvent s\'inscrire au cours'
    }
  }],
  schedule: {
    startDate: {
      type: Date
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: 'La date de fin doit être postérieure à la date de début'
      }
    },
    sessions: [{
      dayOfWeek: {
        type: String,
        enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
      },
      startTime: {
        type: String,
        validate: {
          validator: function (value) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
          },
          message: 'L\'heure de début doit être au format HH:MM'
        }
      },
      endTime: {
        type: String,
        validate: {
          validator: function (value) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
          },
          message: 'L\'heure de fin doit être au format HH:MM'
        }
      }
    }]
  },
  price: {
    type: Number,
    min: [0, 'Le prix ne peut être négatif'],
    default : 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  resources: [{
    name: String,
    fileUrl: String,
    fileType: String
  }],
  thumbnail: {
    type: String,
    default: 'https://example.com/default-course-thumbnail.jpg'
  }
}, {
  timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pour les recherches fréquentes
courseSchema.index({ title: 'text', description: 'text', subject: 1 });

// Virtual pour le nombre d'étudiants
courseSchema.virtual('studentCount').get(function () {
  return this.students ? this.students.length : 0;
});

// Middleware pour nettoyer les références avant suppression
courseSchema.pre('remove', async function (next) {
  await mongoose.model('User').updateMany(
    { $or: [{ _id: this.teacher }, { _id: { $in: this.students } }] },
    { $pull: { courses: this._id } }
  );
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
