import bcryptjs from 'bcryptjs'
export default class Utility {
   //Get the Sorted Users by email
   static sortUsersByEmail(users) {
      return users.sort((a, b) => a.email.localeCompare(b.email))
   }

   //Generate hash password
   static async generateHashPassword(password) {
      return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10), null);
   }

   //Checking if password is valid
   static validatePassword(password, hashPassword) {
      return bcryptjs.compareSync(password, hashPassword);
   }

   //Pagination helper function
   static async pagination(options) {
      let offset = options.page ? parseInt(options.page) : 0;
      let limit = options.limit ? parseInt(options.limit) : 20;
      return { offset: offset, limit: limit }
   }

   //Order helper function
   static async order(options) {
      if (!options.order || options.order === 'old') {
         return [['createdAt', 'ASC']]
      }
      else if (!options.order || options.order === 'new') {
         return [['createdAt', 'DESC']]
      }
      else {
         //Default
         return [['createdAt', 'ASC']]
      }
   }
}