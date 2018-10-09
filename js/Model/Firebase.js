class Firebase {
  constructor() {

  }
  /* firebase method stringify and store in one value
  writeQuestions(questions) {
    let stringData = JSON.stringify(questions);
    this.storetoFBQuestions(stringData);
  }
  storetoFBQuestions(stringData) {
    firebase.database().ref('questions/').set({
      questions: stringData,
    });
  }
  */

  //executes writing current questions to database
  writeFireStorage() {
    toggleSaveBtn();
    this.removeCollection();
  }

  //writing questions
  writeNewQuestions() {
    var count = 0; 
    for(let i =0; i < questions.length; i++) {
      var current = {
        choices: questions[i].choices,
        question: questions[i].question,
        answer: questions[i].answer,
        difficulty: questions[i].difficulty
      }
      db.collection("questions").add(current)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          count++;
          if(count == (questions.length)) {
            toggleSaveBtn();
            toggleReminderVal = false;
            toggleReminder(toggleReminderVal);
          }
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }
  }

  //reset collection 
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

  //gets questions for admin page
  getQuestions() {
    questions = [];
    var jobskill_query = db.collection('questions');
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        questions.push(doc.data());
        showQuestions();
      });
    });
  }

  //retrieves questions based on difficulty
  getQuestionsQuiz(selectedDifficulty) {
    questions = [];
    var jobskill_query = db.collection('questions').where("difficulty", "==", selectedDifficulty);
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        questions.push(doc.data());
        createQuiz();
      });
    });
  }
}
