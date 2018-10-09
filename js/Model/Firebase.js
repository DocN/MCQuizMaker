class Firebase {
  constructor() {

  }
  writeQuestions(questions) {
    let stringData = JSON.stringify(questions);
    this.storetoFBQuestions(stringData);
  }
  storetoFBQuestions(stringData) {
    firebase.database().ref('questions/').set({
      questions: stringData,
    });
  }

  writeFireStorage() {
    this.removeCollection();
    //this.writeNewQuestions();
  }

  writeNewQuestions() {
    for(let i =0; i < questions.length; i++) {
      var current = {
        choices: questions[i].choices,
        question: questions[i].question,
        answer: questions[i].answer
      }
      db.collection("questions").add(current)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }
  }

  removeCollection() {
    var jobskill_query = db.collection('questions');
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
      let firebae = new Firebase();
      firebae.writeNewQuestions();
    });
    
  }
  
  getQuestions() {
    return firebase.database().ref('/questions').once('value').then(function(snapshot) {
      questions = JSON.parse(snapshot.val().questions);
      showQuestions();
    });
  }
}
