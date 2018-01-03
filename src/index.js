import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ToDoApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items:[],
            text:'',
            edit:false,
            editId:-1
        };
        this.AddNewItem = this.AddNewItem.bind(this);
        this.HandleTextBoxChange = this.HandleTextBoxChange.bind(this);
        this.EditItem = this.EditItem.bind(this);
        this.UpdateItem = this.UpdateItem.bind(this);
        this.CancelEdit = this.CancelEdit.bind(this);
        this.DeleteItem = this.DeleteItem.bind(this);
    }

    AddNewItem(e){

        const newItem = {
                "content" : this.state.text
              };
        
        this.setState((prevState) => ({
            items:prevState.items.concat(newItem),
            text:''    
        }));
        

    }

    HandleTextBoxChange(e){

        this.setState({
            text:e.target.value
        });

    }

    EditItem(itemIndex){

        var editItem = this.state.items[itemIndex];

        this.setState({
            text:editItem.content,
            edit:true,
            editId:itemIndex
        });

    }

    UpdateItem(){
        
        var currentEdit = this.state.editId;
        var updateList = this.state.items.map((item,index)=>{
            if (index !== currentEdit){
                return item;
            }
            return {"content":this.state.text};
        });
        this.setState({
            items:updateList,
            text:'',
            edit:false,
            editId:-1
        });

    }

    CancelEdit(){
        this.setState({
            text:'',
            edit:false,
            editId:-1
        });
    }

    DeleteItem(itemIndex){
        var tempItems = this.state.items.slice();
        tempItems.splice(itemIndex,1);
        this.setState({
            items:tempItems
        });
    }

    render(){

        const toDoList = this.state.items.map((item,index)=>
             <div key = {index} className = "todo-list-item">
                <span className = "todo-list-item-sno">#{index + 1} - </span>
                <span className = "todo-list-item-content">{item.content}</span>
                <span className = "todo-list-item-edit-option">
                    <input type = "button" id = "btn-edit" name = "btn-edit" onClick = {()=>{ this.EditItem(index) }} value = "Edit" />
                    <input type = "button" id = "btn-delete" name = "btn-delete" onClick = {()=>{ this.DeleteItem(index) }} value = "Delete" />
                </span>
                <div className = "clear"></div>
            </div>
        );

        return (
            
            <div className = "todo-app">
                <h1>To Do - App</h1>
                <div className = "todo-add-save-section">
                    <input type = "text" id = "todo-input-box" onChange = {this.HandleTextBoxChange} name = "todo-input-box" value = { this.state.text } />
                    { this.state.edit === false ? (
                        <input type = "button" id = "btn-add" name = "btn-add" onClick = {this.AddNewItem} value = "Add" />
                    ) : (
                        <input type = "button" id = "btn-update" name = "btn-update" onClick = {this.UpdateItem} value = "Update" />
                    ) }
                    { this.state.edit === true &&
                        <input type = "button" id = "btn-cancel" name = "btn-cancel" onClick = {this.CancelEdit} value = "Cancel" />
                    }
                </div>
                <div className = "todo-list-section">
                    {toDoList}
                </div>
            </div> 

        );
    
    }
}


ReactDOM.render(<ToDoApp />, document.getElementById('root'));

