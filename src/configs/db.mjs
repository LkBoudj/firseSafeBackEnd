import mongoose from "mongoose";

//Get the default connection

const path = `mongodb+srv://hichem:Tx18cLBusiXcch6k@cluster0.dowi4wb.mongodb.net/fireSafe`;
const mainDb = () => {
  mongoose
    .connect(path)
    .then((res) => {
      console.log("is connected");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default mainDb;
