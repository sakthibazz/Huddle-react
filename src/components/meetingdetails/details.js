import React,{ Component } from 'react'
import Menu from '../menu/menu'

class Details extends Component{
    render(){
        return(
            
            <div>
                <Menu />
                <div className="container mt-5 pt-5">
                    <h2>Task Highlights</h2>
                    <div className="row mt-5">
                        <div className="col-sm-4">
                           <label className="pr-2">Project Name:</label>
                           <input type="text" placeholder="" />
                        </div>
                        <div className="col-sm-4">
                        <label className="pr-2">Manager Name:</label>
                           <input type="text" placeholder="" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label className="col-sm-2 float-left pt-1">Date:</label>
                            <input type="date" name="bday" max="3000-12-31" 
                                    min="1000-01-01" class="form-control col-sm-6" />
                        </div>
                    </div>
                    <div className="row">
                        <div class="form-group">
                            <label for="comment">New Task:</label>
                            <textarea class="form-control" rows="5" cols="235" id="comment" name="text"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div class="form-group">
                            <label for="comment">Completed Task:</label>
                            <textarea class="form-control" rows="5" cols="235" id="comment" name="text"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div class="form-group">
                            <label for="comment">Continued Task:</label>
                            <textarea class="form-control" rows="5" cols="235" id="comment" name="text"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div class="form-group">
                            <label for="comment">Dependancy</label>
                            <textarea class="form-control" rows="5" cols="235" id="comment" name="text"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div class="form-group">
                            <label for="comment">Learning</label>
                            <textarea class="form-control" rows="5" cols="235" id="comment" name="text"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details