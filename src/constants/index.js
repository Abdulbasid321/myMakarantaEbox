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


constants.mediaType = [
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
    "Primary 1",
    "Primary 2",
    "Primary 3",
    "Primary 4",
    "Primary 5",
    "Primary 6",
    "Nursery 1",
    "Nursery 2",
    "JSS 1",
    "JSS 2",
    "JSS 3",
    "SS 1",
    "SS 2",
    "SS 3",
    "Undergraduate",
    "Postgraduate"
];

// constants.academicLevel = [
//     "Undergraduate",
//     "Postgraduate",
//     "PhD",
//     "Masters",
//     "Diploma",
//     "Certificate",
//     "High School",
//     "Secondary School",
//     "Primary School",
//     "Kindergarten",
//     "Nursery",
//     "Preschool",
// ];

module.exports = constants;