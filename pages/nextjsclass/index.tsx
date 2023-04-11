


const ClassHome = (props) => {
    const { products } = props;
    return (
        <div>
            <h1 className="text-4xl">Class Home</h1>
            <ul>
                
            </ul>
        </div>
    );
};

export async function getStaticProps() {
    return { 
        props: {
            products: {id: "p1", title: "Product 1"}
        }
    }
}
export default ClassHome;