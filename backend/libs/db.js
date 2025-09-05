import mongoose from 'mongoose';

const DbCon =async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to mongodb💛');
    }catch(error){
        console.log('mongodb error',error);
    }
}
export default DbCon;