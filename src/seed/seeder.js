const mongoose = require('mongoose');
const connectDB = require('../config/mongoooseDB');
const UserModel = require('../model/User.model');
const bcrypt = require('bcryptjs');

let superAdminUsers = [
    {
        firstName: "Idris",
        lasttName: "Mu'azu",
        otherName: "Muhammad",
        userName: "iDi",
        phoneNumber: "08133457535",
        email: "idriscreate@gmail.com",
        password: 'idi21550',
        role: "superAdmin",
        department: "Engineering",
        isVerified: true,

    }
]


const seedFunc = async () => {
    await connectDB();
    
    try {
        //filter duplictes
        const existingUsers = await UserModel.find({});
        const arr = [];
        existingUsers.map((user) => {
            arr.push(user.email);
        });
        const superAdminsToInsert = superAdminUsers.filter(user => !arr.includes(user.email));
        if(superAdminsToInsert.length == 0) {
            return console.log('Super admin user(s) already exist on DB\n');
        }

        //insert super admin(s)
        superAdminUsers.map(async(adminUser) => {
            adminUser.password = bcrypt.hashSync(adminUser.password, 12);
        })
        console.log('Password(s) hashed')

        const superAdmins = await UserModel.insertMany(superAdminsToInsert);
        if (superAdmins.length > 0){
            console.log("Admin user(s) seeded successfully.\n")
        } else {
            console.log('Seeding admin user(s) failed.\n')
        }
    } catch (error) {
        console.log('Something went wrong...');
        console.log(`Error: ${error} \n`);
    } finally {
        await mongoose.disconnect();
        console.log('Seeding process completed...\n');
        process.exit();
    }
}

seedFunc();

