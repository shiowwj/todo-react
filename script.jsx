class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            date: new Date(),
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
            date: new Date()
        });
    }

    render(){
        return(
            <div className="clock-container">
                <h2>{this.state.date.toLocaleTimeString('en-SG')}</h2>
            </div>
        );
    }
}

class TableOutPut extends React.Component{
    constructor(){
        super()
    }

    render(){
        const listOutPut = this.props.listArr.map((item,index)=>{
            return(
                <tr className='table-row' key={index}>
                    <td>#{index+1}</td>
                    <td><h2>{item.task}</h2><br/> <h5>Created on: {item.created_at}</h5></td>
                    <td><button className="delete-task-button" id={index} onClick={(e)=>{this.props.makeLove(e)}} >⤬</button>
                        <button className="edit-task-button" id={index} onClick={(e)=>{this.props.fickleHead(e)}} >✎</button>
                        <button className="done-task-button" id={index} onClick={(e)=>{this.props.makeLove(e)}} >✔️</button>
                    </td>
                </tr>

            );
        })

        return(

            <table className="table-main">

                <thead className="table-main">
                    <tr>
                        <th className="table-head">No.</th>
                        <th className="table-head">Items</th>
                        <th className="table-head">Action</th>
                    </tr>
                </thead>
                <tbody className="table-main">
                    {listOutPut}
                </tbody>
            </table>
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

    }

    render() {
        // render the list with a map() here
        console.log("rendering");
        console.log(this.state.removedList);
        return (
            <div className="list">
                <Form formInput={this.formInput} submitItem={this.submitItem} className={this.state.className} value={this.state.word}/>
                <TableOutPut listArr={this.state.list} makeLove={this.deleteItem} fickleHead={this.editItem}/>
                <DeletedItems listArr={this.state.removedList}/>
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
                <tr className='table-row' key={index}>
                    <td>#{index+1}</td>
                    <td><h2>{item.deleted}</h2><br/> <h5>Created on: {item.modified_at}</h5></td>
                    <td>yo?</td>
                </tr>
            );
        })
        return(
            <div>
            <h3>Removed Items</h3>
            <table className="table-main">
                <thead className="table-main">
                    <tr>
                        <th className="table-head">No.</th>
                        <th className="table-head">Items</th>
                        <th className="table-head">Action</th>
                    </tr>
                </thead>
                <tbody className="table-main">
                    {listOutPut}
                </tbody>
            </table>
            </div>
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

class App extends React.Component{
    render(){
        return(
        <div>
            <Clock/>
            <List/>
        </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);