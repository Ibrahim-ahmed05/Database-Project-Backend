module.exports=(sequelize,DataTypes)=>{
    const user= sequelize.define("Users",{
        name:{
            type:DataTypes.STRING,
            allowNULL:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNULL:false,
        },
        password:{
            type: DataTypes.STRING,
            allowNULL:false,
        },
    })
    return user;
}