import IAdmin from "./IAdmin";
import IClassRoom from "./IClassRoom";
import ISchool from "./ISchool";
import IStudent from "./IStudent";
import ISuperAdmin from "./ISuperAdmin";

interface IDataStore extends ISchool, IStudent, IClassRoom, IAdmin, ISuperAdmin {}

export default IDataStore