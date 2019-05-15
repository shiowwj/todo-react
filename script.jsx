class TableOutPut extends React.Component{
    constructor(){
        super()

        this.state ={
            listAgain:[],
        }
    }

    render(){
        // console.log(this.props)
        console.log(this.state.listAgain);
        const listOutPut = this.props.listArr.map((item,index)=>{
            return(
                <tr className='table-row' key={index}>
                    <td>#{index+1}</td>
                    <td>{item}</td>
                    <td><button className="delete-task-button" id={index} onClick={(e)=>{this.props.makeLove(e)}} >⤬</button>
                        <button className="edit-task-button" id={index} onClick={(e)=>{this.props.fickleHead(e)}} >✎</button>
                        <button className="done-task-button" id={index} onClick={(e)=>{this.props.makeLove(e)}} >✔️</button>
                    </td>
                </tr>

            );
        })

        return(

            <table className="table-main">
                <col width="150"/>
                <col width="1000"/>
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
        // this.formInputHandler = this.formInputHandler.bind( this );
        // this.submitItem = this.submitItem.bind( this );
        // this.deleteItem = this.deleteItem.bind( this );
        this.submit = false;


        this.state = {
            list : [],
            word : "",
            className:"",
        }
    }
    //triggers when things are typed and only submits when conditions are met
    formInput=(e)=>{
        if(e.keyCode == 13 && (this.state.word.length >= 1 && this.state.word.length < 100)){
            this.state.list.push(this.state.word)
            this.setState(this);
            e.target.value = '';
        }else{
            if(this.state.word.length > 100){
                this.state.className = "warning";
                this.setState({className: this.state.className})
            }
        }

        this.setState({word: e.target.value});

        if(this.state.word.length > 100){
            this.state.className = "warning";
            this.setState({className: this.state.className})
        }else{
            this.state.className = "";
            this.setState({className: this.state.className})
        }

        // console.log("change", e.target.value);

    }

    submitItem=(e)=>{
        // console.log('submit item?', this)
        if(this.state.word.length >= 1 && this.state.word.length < 100 ){
            this.state.list.push(this.state.word)
            this.setState(this)
            this.setState({word: ""});
        } else {
            if(this.state.word.length > 5){
                this.state.className = "warning";
                this.setState({className: this.state.className})
            }
        }
    }

    deleteItem=(f)=>{

        this.state.list.splice(f.target.id,1)
        this.setState({list:this.state.list})
    }

    editItem=(e)=>{

    }

    render() {
        // render the list with a map() here
        console.log("rendering");
        console.log(this.state.list);
        return (
            <div className="list">
                <div className="input-container">
                <input
                onChange={(e)=>{this.formInput(e)}}
                value={this.state.word}
                onKeyDown={(e)=>{this.formInput(e)}}
                className={this.state.className}
                className="input-box"
                placeholder="What's your task for today?"/>
                <button className="button-input" onClick={(e)=>{this.submitItem(e)}} >ADD TASK</button>
                </div>

                <TableOutPut listArr={this.state.list} makeLove={this.deleteItem} fickleHead={this.editItem}/>
            </div>
        );
    }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

// onKeyDown={this.submitItem}