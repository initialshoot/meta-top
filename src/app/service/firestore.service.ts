import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  // Start Firebase optional CRUD Functions

  createDoc(userData: any, path: string, id: string) {

    const collection = this.firestore.collection(path);
    return collection.doc(id).set(userData);

  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {

    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges()
  }

  // End Firebase optional CRUD Functions

  // start Users CRUD Functions
  
  getUsers() {
    return this.firestore
      .collection("Users")
      .snapshotChanges()
  }

  getUserById(id: string) {
    return this.firestore
      .collection("Users")
      .doc(id)
      .valueChanges()
  }

  createUser(userData: any) {
    return new Promise<any> ( ( resolve, reject ) => {
      this.firestore
        .collection("Users")
        .add(userData)
        .then( (response) => {
          console.log(response)
        },
        (error) => {
          reject(error)
        })
    })
  }

  updateUser(userData: any, id: string) {
     return this.firestore
       .collection("Users")
       .doc(id)
       .update({
        email: userData.email,
        phone: userData.phone,
        fName: userData.fName,
        sName: userData.sName
       });
  }

  delUser(userData: any) {
    return this.firestore
      .collection("Users")
      .doc(userData.uid)
      .delete()
  }

  // End Users CRUD Functions

  // Start Services CRUD Functions 

  getService() {
    return this.firestore
      .collection("Services")
      .snapshotChanges()
  }

  getServiceById(id: string) {
    return this.firestore
      .collection("Services")
      .doc(id)
      .valueChanges()
  }

  createService(serciveData: any) {
    return new Promise<any> ( ( resolve, reject ) => {
      this.firestore
        .collection("Services")
        .add(serciveData)
        .then( (response) => {
          this.firestore
            .collection("Services")
            .doc(response.id)
            .update({
               uid: response.id
            });
        },
        (error) => {
          reject(error)
        })
    })
  }

  updateService(serciveData: any, id: string) {
    return this.firestore
      .collection("Services")
      .doc(id)
      .update({
       sName: serciveData.sName,
       description: serciveData.description,
       cost: serciveData.cost
      });
 }

 delService(serciveData: any) {
  return this.firestore
    .collection("Services")
    .doc(serciveData.uid)
    .delete()
}

  // End Services CRUD Functions

  // Start Medics CRUD Functions 

  getMedics() {
    return this.firestore
      .collection("Medicos")
      .snapshotChanges()
  }

  getMedicById(id: string) {
    return this.firestore
      .collection("Medicos")
      .doc(id)
      .valueChanges()
  }

  createMedic(serciveData: any) {
    return new Promise<any> ( ( resolve, reject ) => {
      this.firestore
        .collection("Medicos")
        .add(serciveData)
        .then( (response) => {
          this.firestore
            .collection("Medicos")
            .doc(response.id)
            .update({
               uid: response.id
            });
        },
        (error) => {
          reject(error)
        })
    })
  }

  updateMedic(serciveData: any, id: string) {
    return this.firestore
      .collection("Medicos")
      .doc(id)
      .update({
       uid: serciveData.uid,
       sName: serciveData.sName,
       description: serciveData.description,
       cost: serciveData.cost
      });
 }

 delMedic(serciveData: any) {
  return this.firestore
    .collection("Medicos")
    .doc(serciveData.uid)
    .delete()
}

  // End Medics CRUD Functions 

}