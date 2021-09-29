// import firebase from './firebase';
import { database } from './firebase';

// import { useAuth } from '/contexts/AuthContext'

// const { currentUser, logout } = useAuth()

const db = database.ref('/blogs')

class BlogDataService {

    getAll() {
      return db;       
    }
  
    create(blog) {
      return db.push(blog);
    }
  
    update(key, value) {
      return db.child(key).update(value);
    }
  
    delete(key) {
      return db.child(key).remove();
    }
  
    deleteAll() {
      return db.remove();
    }
  }
  
  export default new BlogDataService();