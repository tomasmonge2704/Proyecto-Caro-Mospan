import mongoose from 'mongoose'
import bCrypt from 'bcryptjs'
const url = 'mongodb+srv://tomas22:1roZJIVtj5JnG5HH@cluster0.cycnd1i.mongodb.net/?retryWrites=true&w=majority'
const User = mongoose.model('Usuarios', new mongoose.Schema({ username: String, password: String }));
//conectar a la BDD
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
async function conectDB() {
    await mongoose.connect(url,connectionParams);
    console.log("connected")
}
//crea hash para password
function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
//valida la contraseña
function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}
// encontrar usuario
async function encontrarUsuario(username) {
   const res = await User.findOne({ username: username }).exec();
    return res
}
//crea el usuario
async function crearUsuario(username, password, token) {
    await conectDB()
    const encontrado = await encontrarUsuario(username)
    if (encontrado !== null) {
        return 'este username ya existe'
    } else {
        if (token == "1roZJIVtj5JnG5HH"){
            User.create({
                username: username,
                password: createHash(password)});
            return 'usuario creado'
        }else{
            return 'token incorrecto'
        }
    }
}
//valida el usuario
async function login(username, password) {
    await conectDB()
    const encontrado = await encontrarUsuario(username)
        if (encontrado == null) {
            console.log("User Not Found with username " + username);
            return false;
        }
        if (!isValidPassword(encontrado,password)) {
            console.log("Invalid Password");
            return false;
        }else{
            return true;
        }
}

export { login, crearUsuario }