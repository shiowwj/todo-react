class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            day: moment().format("MMM Do YYYY"),
            date: moment().format('LTS'),
        }
    }
    //runs after the component output has been rendered to the DOM, triggers clock update. (sets a timer)
    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),1000);
    }
    //will TEAR DOWN the timer in the lifecycle method
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    //this will update clock by calling setState every second
    tick(){
        this.setState({
            day: moment().format("MMM Do YYYY"),
            date: moment().format('LTS'),
        });
    }

    render(){
        return(
            <div className="clock-container">
                <h2>{this.state.day}</h2>
                <h2>{this.state.date}</h2>
            </div>
        );
    }
}

class List extends React.Component {
    constructor(){
        super()
        this.state = {
            list : [],
            word : "",
            className:"input-box",
            removedList: [],
            editWord: "",
        }
    }
    //triggers when things are typed and only submits when conditions are met
    formInput=(e)=>{
        if( e.keyCode == 13 && ( this.state.word.length >= 1 && this.state.word.length < 100 )){
            this.state.list.push( {
                "task": this.state.word,
                "created_at": moment().format('MMMM Do YYYY, h:mm:ss a')
            } )
            this.setState( this );
            e.target.value = '';
        }else{
            if(this.state.word.length > 100){
                this.state.className = "warning";
                this.setState( {className: this.state.className} )
            }
        }

        this.setState({word: e.target.value});

        if(this.state.word.length > 100){
            this.state.className = "warning";
            this.setState( {className: this.state.className} )
        }else{
            this.state.className = "input-box";
            this.setState( {className: this.state.className} )
        }
    }
    //handles submit button action.
    submitItem=(e)=>{
        // console.log('submit item?', this)
        if( this.state.word.length >= 1 && this.state.word.length < 100 ){
            this.state.list.push({
                "task": this.state.word,
                "created_at": moment().format('MMMM Do YYYY, h:mm:ss a')
            })
            this.setState( this );
        } else {
            if( this.state.word.length > 5 ){
                this.state.className = "warning";
                this.setState( {className: this.state.className} )
            }
        }
    }

    deleteItem=(f)=>{

        let deletedItem = this.state.list[f.target.id];
        this.state.list.splice( f.target.id , 1 );
        this.setState( {list:this.state.list} );

        this.state.removedList.push({
            "deleted": deletedItem.task,
            "modified_at": moment().format('MMMM Do YYYY, h:mm:ss a'),
        });

        this.setState( {removedList: this.state.removedList} );
    }

    editItem=(e)=>{
        console.log('edit form words', e.target.value)
        this.state.editWord = e.target.value;
    }

    render() {
        // render the list with a map() here
        // console.log("rendering");
        // console.log(this.state.removedList);
        return (
            <div className="list">
                <Form formInput={this.formInput} submitItem={this.submitItem} className={this.state.className} value={this.state.word}/>
                <TableOutPut listArr={this.state.list} makeLove={this.deleteItem} editFunc={this.editItem}/>
                <DeletedItems listArr={this.state.removedList}/>
            </div>
        );
    }
}

class TableOutPut extends React.Component{
    constructor(){
        super()
    }

    render(){
        let editState = {
            editing:true,
        }
        const listOutPut = this.props.listArr.map((item,index)=>{
            return(
                <div className="table-row" key={index}>
                    <div>
                        <SingleTask index={index} task={item.task} created={item.created_at}/>
                    </div>
                    <div>
                        <button className="done-task-button" id={index} onClick={(e)=>{this.props.makeLove(e)}} >✔️</button>
                        <button className="edit-task-button" id={index} onClick={(e)=>{this.props.editFunc(e,index)}} >✎</button>
                        <button className="delete-task-button" id={index} onClick={(e)=>{this.props.makeLove(e)}} >⤬</button>
                    </div>
                </div>
            );
        })

        return(
            <div >
                {listOutPut}
            </div>
        );
    }
}
class SingleTask extends React.Component{
    render(){
        return(
            <div key={this.props.index}>
                <p>#{this.props.index+1}</p><h2>{this.props.task}</h2><h5>{this.props.created}</h5>
            </div>
        );
    }
}
class DeletedItems extends React.Component{
    constructor(){
        super()
    }
    render(){
        const listOutPut = this.props.listArr.map((item,index)=>{
            return(
                <div className="table-row" key={index}>
                    <div>
                        <p>#{index+1}</p><h3>{item.deleted}</h3><h5>Done on: {item.modified_at}</h5>
                    </div>
                </div>
            );
        })
        return(
            <div>
            <h2>Removed Items</h2>
                <div>
                    {listOutPut}
                </div>
            </div>
        );
    }
}

class EditForm extends React.Component{
    constructor(){
        super()
        this.state = {
            editing: false,
        };
    }
    render(){

        console.log(this.props)
        return (
            <input
            onChange={(e)=>{this.props.editSingleItem(e)}}
            value={this.props.editValue}
            />
        );
    }
}

class Form extends React.Component{
    render(){
        return(
            <div className="input-container">
                <input
                onChange={(e)=>{this.props.formInput(e)}}
                value={this.props.value}
                onKeyDown={(e)=>{this.props.formInput(e)}}
                className={this.props.className}

                placeholder="What's your task for today?"/>
                <button className="button-input" onClick={(e)=>{this.props.submitItem(e)}} >ADD TASK</button>
            </div>
        );
    }
}

const App =() =>(
    <div>
        <Clock/>
        <List/>
    </div>
);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);