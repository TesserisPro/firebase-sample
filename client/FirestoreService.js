class FirestoreService {
  static getBlogs(db) {
    return db.collection('blogs').orderBy('timeStamp', 'desc').get().then(array => array.docs.map(el => el.data()));
  }
  static onBlogsChange(db) {
    return db.collection('blogs').orderBy('timeStamp', 'desc');
  }
  static onBlogsChangeByEmail(db, email) {
    return db.collection('blogs')
      .where('author', '==', email)
      .orderBy('timeStamp', 'desc');
  }
  static getUsers(db) {
    return db.collection('users').get().then(array => array.docs.map(el => el.data()));
  }
  static postMessage(db, message, email) {
    return db.collection('blogs').add({
      timeStamp: new Date(),
      body: message,
      author: email
    });
  }
  static addUser(db, user) {
    return db.collection('users').add(user);
  }
  static findUserByEmail(db, email) {
    return db.collection('users')
      .where('email', '==', email)
      .get()
      .then(el => (el.docs[0] ? el.docs[0].data() : null));
  }
  static deleteMessage(db, id) {
    return db.collection('blogs').doc(id).delete();
  }
}

export default FirestoreService;
