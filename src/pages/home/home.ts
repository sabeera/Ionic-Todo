import { Component } from '@angular/core';
import { NavController,AlertController,reorderArray,ToastController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { ArchivedTodosPage } from '../../pages/archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public todos=[];
public reorderIsEnabled=false;
public archivedTodosPage=ArchivedTodosPage;
  constructor(private toastCntrl:ToastController,private todoProvider:TodoProvider,public navCtrl: NavController,private alertCtrl:AlertController) {
    this.todos=this.todoProvider.getTodos();
  }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }
  ionItemReorder($event){
    reorderArray(this.todos,$event);
  }
  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }
  archiveTodo(todoIndex){
    this.todoProvider.archiveTodo(todoIndex);
  }
  editTodo(todoIndex){
    this.initiateTodoAlert('Edit',todoIndex);
  }
  openTodoAlert(){
    this.initiateTodoAlert('Add',null);
  }
  initiateTodoAlert(type,index){
    if(type === 'Add'){
      var options={
        title:"Add a Todo",
        message:"Enter your Todo",
      };
    }else{
      var options={
        title:"Edit a Todo",
        message:"Edit your Todo",
      };
    }
    let todoAlert=this.alertCtrl.create({
      title:options.title,
      message:options.message,
      inputs :[{
        type:"text",
        name:type+"TodoInput",
        value:this.todos[index]
      }],
      buttons:[{
        text:"Cancel"
      },{
        text:type+"Todo",
        handler:(inputData)=>{
          let todoText;
          todoText = inputData[type+"TodoInput"];
          this.todoProvider.addTodo(todoText);
          todoAlert.onDidDismiss(()=> {
            let todoToast =this.toastCntrl.create({
            message:"Todo"+type+"ed",
            duration:2000
          });
          todoToast.present();
        });
        }
      }]
    });
    todoAlert.present();
  }
}
