const ProductPlaceholder = () => {
    return (
        <div className="col">
            <div className="card" aria-hidden="true">
                <img src="https://trirama.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png" className="card-img-top" style={{ height: '212px', objectFit: 'cover' }} alt="placeholder" />
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-8"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-4"></span>
                    </p>
                    <a href="#tag-placeholder" tabIndex="-1" className="btn btn-secondary rounded-5 disabled placeholder col-4 tag"></a>
                    <p className="mt-2 placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </p>
                    <a href="#add-cart-placeholder" tabIndex="-1" className="btn btn-primary disabled placeholder col-3"></a>
                </div>
            </div>
        </div>
    )
}

export default ProductPlaceholder;