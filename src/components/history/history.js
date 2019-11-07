import React,{ Component } from 'react'
import Menuone from "../menu/menu-1";
import {Link} from 'react-router-dom'
import { makeStyles ,useStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

class History extends Component {
  state ={
    rows:[]
  }
      
    render(){
        const useStyles = makeStyles(theme => ({
            formControl: {
              margin: theme.spacing(1),
              minWidth: 120,
            },
            selectEmpty: {
              marginTop: theme.spacing(2),
            },
          }));
        return(
            <div>
                {/* <Menuone /> */}
                <div className="container">
                <form className="col-sm-12 text-center mt-3">
                        <div className="form-group">
                            <label className="col-sm-1 float-left pt-2">Date:</label>
                            <input type="date" name="bday" max="3000-12-31" 
                                    min="1000-01-01" class="form-control col-sm-3" />
                        </div>
                        
                        
                        
                        
                        </form>
                        <div className="row">
                        <div className="col-sm-4">
                        <FormControl >
        <InputLabel htmlFor="uncontrolled-native">Select Project</InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'name',
            id: 'uncontrolled-native',
          }}
        >
          <option value=""  disabled> Project </option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
        <FormHelperText>Uncontrolled</FormHelperText>
      </FormControl>

                        </div>
                        <div className="col-sm-6">
                          <label>Tasks</label>
                          <input type="text" value="" name="task" />
                        </div>
                        <div className="col-sm-2">
                          <span><i className="fa fas fa-plus"></i></span>
                        </div>
                        </div>
                    
                    
                       
                      
                    
                    
                   
                </div>
            </div>
        )
    }
}

export default History