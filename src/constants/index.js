const constants = {};

constants.roles = [
    "student",
    "instructor",
    "admin",
    "superAdmin"
];

constants.userStatus = [
    "active",
    "suspended",
    "expelled"
];


constants.mediaType= [
	"image",
	"video",
    "audio",
	"file"
];

constants.mediaFor = [
    "profile",
    "subject"
];

constants.academicLevel = [
    "Undergraduate",
    "Postgraduate",
    "PhD",
    "Masters",
    "Diploma",
    "Certificate",
    "High School",
    "Secondary School",
    "Primary School",
    "Kindergarten",
    "Nursery",
    "Preschool",
];

module.exports = constants;