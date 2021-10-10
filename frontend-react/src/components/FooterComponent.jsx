import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <footer className="footer">
                    <a href="https://www.dynamicweb.ru/">
                        <span className="text-muted">Developed by Augusto Diaz for Dynamic Web</span>
                    </a>                  
                </footer>
            </div>
        )
    }
}

export default FooterComponent; 