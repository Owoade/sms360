const NewStock = () => {
    return (  
        <div className="add-container">
            <div className="main-card">
                <form action="">
                    <h1>Add new stock</h1>
                    <input type="text" placeholder="Enter stock name" className="form-control form-input" />
                    <input type="number" placeholder="Enter stock value" className="form-control form-input"/>
                    <input type="number" placeholder="Enter stock unit" className="form-control form-input"/>
                    <button className="form-control form-btn" type="submit">Add stock</button>
                </form>
            </div>
        </div>
    );
}
 
export default NewStock;