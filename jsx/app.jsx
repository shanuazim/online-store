const React = require('react')
const ReactDOM = require('react-dom')


const { hashHistory,
  Router,
  Route,
  IndexRoute,
  Link,
  IndexLink
} = require('react-router')

const Modal = require('./modal.jsx')
const Cart = require('./cart.jsx')
const Checkout = require('./checkout.jsx')
const Product = require('./product.jsx')
const Profile = require('./profile.jsx')

const PRODUCTS = [
    {id: 0, src: 'images/flowers.jpg', title:'flowers', price: 19.99},
    {id: 1, src: 'images/minnie.jpg', title:'minnie', price:29.99},
    {id: 2, src: 'images/pink.jpg', title:'pink', price:39.99},
    {id: 3, src: 'images/redchecks.jpg', title:'redchecks', price:9.99}
]

const Heading = () => {
    return <h1>Adorabelle Kids Store</h1>
}

const Copy = () => {
    return <p>Please click on a dress for details!!</p>
}

console.log('start application')

class App extends React.Component{
    componentWillReceiveProps(nextProps){
        this.isModal = (nextProps.location.state &&
          nextProps.location.state.modal)
        if (this.isModal && 
          nextProps.location.key !== this.props.location.key){
          this.previousChildren = this.props.children
        }
    }
    render(){
        console.log('Modal', this.isModal)
        return (
            <div className="well">
              <Heading/>
              <div>
                  {(this.isModal)?this.previousChildren:this.props.children}
                  {(this.isModal)?
                      <Modal isOpen={true} returnTo={this.props.location.state.returnTo}>
                        {this.props.children}
                      </Modal>: ''
                   }
              </div>
            </div>
        
        )
    }
}

class Index extends React.Component{
    render(){
        return (
         <div>
            <Copy/>  
            <p><Link to="/cart" className="btn btn-info">Cart</Link>
               <Link to="/profile" className="btn btn-info">Accesories</Link>
            </p>
                        
            <div>   
               {PRODUCTS.map(picture => (
                 <Link key ={picture.id}
                   to={{pathname:`/products/${picture.id}`,
                   state: { modal: true,
                    returnTo:this.props.location.pathname}
                   }
                  }>
                  <img style={{ margin: 10}} src={picture.src} height="300"/>
                  </Link>
                ))} 
             </div> 
          </div>   
        )  
      }
    }
let cartItems={}
const addToCart =(id)=>{
  if(cartItems[id])
     cartItems[id] += 1
  else
     cartItems[id] = 1
}

ReactDOM.render((
 <Router history={hashHistory}>
   <Route path="/" component={App}>
     <IndexRoute component = {Index}/>
     <Route path ="/products/:id" component ={Product} addToCart={addToCart} products={PRODUCTS}/>
     <Route path="/cart" component ={Cart}
        cartItems={cartItems} products={PRODUCTS}/>
   </Route>
   <Route path="/checkout" component={Checkout}
      cartItems={cartItems} products={PRODUCTS}/>
 </Router>
), document.getElementById('content'))
