const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    incidentTitle: String,
    incidentLocation: String,
    witnessName: String,
    offenderName: String,
    date: String,
    description: String,
    incidentCategory: String,
    status: String,
    userId: String,
    fileName: String,
    editNote: { type: String, default: null },
    versions: [
      {
        incidentTitle: String,
        incidentLocation: String,
        witnessName: String,
        offenderName: String,
        date: String,
        description: String,
        incidentCategory: String,
        status: String,
        userId: String,
        editNote: String,
        fileName: String,
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { collection: "Forms" }
);

formSchema.pre("save", function (next) {
  const form = this;
  if (form.isModified()) {
    const versions = {
      incidentTitle: form.incidentTitle,
      incidentLocation: form.incidentLocation,
      witnessName: form.witnessName,
      offenderName: form.offenderName,
      date: form.date,
      description: form.description,
      incidentCategory: form.incidentCategory,
      status: form.status,
      userId: form.userId,
      editNote: form.editNote,
    };
    form.versions.push(versions);
  }
  next();
});

const Form = mongoose.model("Form", formSchema, "Forms");

module.exports = Form;
