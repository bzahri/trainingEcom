const Course = require("../models/Course");
const User = require("../models/User");

// ✅ Créer un cours (Professeur uniquement)
exports.createCourse = async (req, res) => {

  try {

    const { title, description, teacher } = req.body;
    

    const newCourse = new Course({
      title,
      description,
      teacher, // 📌 L'enseignant est celui connecté
    });

    await newCourse.save();
    res.status(201).json({ message: "Cours créé avec succès", course: newCourse });
  } catch (error) {
    console.error("Erreur lors de la création du cours:", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// ✅ Récupérer un cours par ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("teacher").populate("students");
    if (!course) {
      return res.status(404).json({ error: "Cours non trouvé." });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du cours." });
  }
};

// ✅ Récupérer tous les cours
exports.getAllCourses = async (req, res) => {
  try {
    const { subject, level, isPublished } = req.query;
    const filter = {};

    if (subject) filter.subject = subject;
    if (level) filter.level = level;
    if (isPublished !== undefined) filter.isPublished = isPublished === "true";

    const courses = await Course.find(filter).populate("teacher");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des cours." });
  }
};

// ✅ Mettre à jour un cours (Professeur uniquement)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Cours non trouvé." });
    }

    if (course.teacher.toString() !== req.user._id) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier ce cours." });
    }

    Object.assign(course, req.body);
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du cours." });
  }
};

// ✅ Supprimer un cours (Professeur uniquement)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Cours non trouvé." });
    }

    if (course.teacher.toString() !== req.user._id) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à supprimer ce cours." });
    }

    await course.remove();
    res.status(200).json({ message: "Cours supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du cours." });
  }
};

// ✅ Publier un cours (Professeur uniquement)
exports.publishCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Cours non trouvé." });
    }

    if (course.teacher.toString() !== req.user._id) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à publier ce cours." });
    }

    course.isPublished = true;
    await course.save();
    res.status(200).json({ message: "Cours publié avec succès." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la publication du cours." });
  }
};

// ✅ Inscrire un étudiant à un cours (Étudiant uniquement)
exports.enrollStudent = async (req, res) => {


  try {
    if (req.user.userType !== "student") {
      return res.status(403).json({ error: "Seuls les étudiants peuvent s'inscrire à un cours." });
    }

    const course = await Course.findById(req.body.courseId);
    if (!course) {
      return res.status(404).json({ error: "Cours non trouvé." });
    }

    if (course.students.includes(req.user.id)) {
      return res.status(400).json({ error: "Vous êtes déjà inscrit à ce cours." });
    }

    course.students.push(req.user.id);
    await course.save();

    res.status(200).json({ message: "Inscription réussie." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'inscription." });
  }
};

// ✅ Désinscrire un étudiant (Étudiant uniquement)
exports.unenrollStudent = async (req, res) => {
  try {
    if (req.user.userType !== "student") {
      return res.status(403).json({ error: "Seuls les étudiants peuvent se désinscrire." });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Cours non trouvé." });
    }

    course.students = course.students.filter((id) => id.toString() !== req.user._id);
    await course.save();

    res.status(200).json({ message: "Désinscription réussie." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la désinscription." });
  }
};

exports.getUserCourses = async (req, res) => {

  try {
    const user = await User.findById(req.user.id).populate("courses");
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    

    res.status(200).json(user.courses);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des cours. MG" });
  }
};

exports.getCourseStudents  = async (req, res) => {
  
  try {
    const { courseId } = req.params;
    
    // Vérifier si le cours existe
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }

    // Récupérer les étudiants inscrits (supposons que le modèle Course a un champ 'students' qui stocke les IDs des étudiants)
    const students = await User.find({ _id: { $in: course.students } }).select("-password"); // Exclure le mot de passe
    
    
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}