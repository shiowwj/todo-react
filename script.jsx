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
                    <td>{index+1}</td>
                    <td>{item}</td>
                    <td><button id={index} onClick={(e)=>{this.props.makeLove(e)}} >Delete Stuff</button></td>
                </tr>

            );
        })
        return(
            <table className="table-main">
                <thead>
                    <tr>
                        <th id="table-head">No.</th>
                        <th id="table-head">Items</th>
                        <th id="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
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

    formInput=(e)=>{
        if(e.keyCode == 13 && (this.state.word.length > 1 && this.state.word.length < 5)){
            this.state.list.push(this.state.word)
            this.setState(this);
            e.target.value = '';
        }else{
            if(this.state.word.length > 5){
                this.state.className = "warning";
                this.setState({className: this.state.className})
            }
        }


        this.setState({word: e.target.value});

        // console.log("change", e.target.value);

    }

    submitItem=(e)=>{
        // console.log('submit item?', this)
        if(this.state.word.length > 1 && this.state.word.length < 5 ){
            this.state.list.push(this.state.word)
            this.setState(this)
            this.setState({word: ""});
        } else {
            if(this.state.word.length > 5){
                this.state.className = "warning";
                this.setState({className: this.state.className})
            }
        }
        this.state.className = "";
        this.setState({className: this.state.className})
    }

    deleteItem=(f)=>{

        this.state.list.splice(f.target.id,1)
        this.setState({list:this.state.list})
    }

    render() {
        // render the list with a map() here
        console.log("rendering");
        console.log(this.state.list);
        return (
            <div className="list">
                <input
                onChange={(e)=>{this.formInput(e)}}
                value={this.state.word}
                onKeyDown={(e)=>{this.formInput(e)}}
                className={this.state.className}/>
                <button onClick={(e)=>{this.submitItem(e)}} >add item</button>
                <TableOutPut listArr={this.state.list} makeLove={this.deleteItem}/>
            </div>
        );
    }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

// onKeyDown={this.submitItem}