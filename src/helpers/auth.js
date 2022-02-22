import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw, username) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then((user)=>{
      saveUser(user,username);
    })
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user,username) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      username : username,
      score : 0
    })
    .then(() => user)
}

export function editUser (username,email,uid) {

  let user = firebaseAuth().currentUser;

    user.updateEmail(email).then(() => {
      console.log("Email updated!");
    }).catch((error) => { console.log(error); });
  

  return ref.child(`users/${uid}/info`)
    .update({
      email: email,
      username : username
    })
    .then((user) => user)
}

export function getAll() {
  return ref.child(`users`);
}


export async function postScore(user, score) {

  let ScoreFromDb = await getDetailUser(user);
  
  let updateScore = ScoreFromDb.score + score;

  return ref.child(`users/${user}/info`)
    .update({
      score : updateScore
    })
    .then(() => user)
}

export function getDetailUser(user) {
  return ref.child(`users/${user}/info`)
    .once('value')
      .then(snapshot => {
        return snapshot.val();
  });

}



