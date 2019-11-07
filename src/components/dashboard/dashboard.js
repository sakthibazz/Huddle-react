import React,{ Component } from 'react'
import Menu from '../menu/menu'

class Dashboard extends Component{
    render(){
        return(
            <div>
                <Menu />
                <section>
                    <div className="container mt-5 pt-5">
                        <div className="row mt-5">
                            <div className="col-sm-12 mt-5">
                                
                            <h1 className="text-center m-5 pt-5">Welcome to Huddle Meeting</h1>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

export default Dashboard