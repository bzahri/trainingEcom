const Topic = require('../models/Topic');
const Reply = require('../models/Reply');

exports.createTopic = async (req, res) => {
  try {
    const { title, content } = req.body;
    const topic = new Topic({ title, content, author: req.user.id });
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du sujet' });
  }
};

exports.getTopics = async (_req, res) => {
  try {
    const topics = await Topic.find().populate('author', 'username').populate('replies');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des sujets' });
  }
};

exports.addReply = async (req, res) => {
  try {
    const { content, topicId } = req.body;
    const reply = new Reply({ content, author: req.user.id, topic: topicId });
    await reply.save();
    await Topic.findByIdAndUpdate(topicId, { $push: { replies: reply._id } });
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de la réponse" });
  }
};