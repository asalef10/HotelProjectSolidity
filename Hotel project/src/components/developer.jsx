export const Developer = (props) => {
  return (
    <div id="developer" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Meet the Developer</h2>
        </div>
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-12 col-sm-6 team">
                  <div className="thumbnail">
                    {' '}
                    <img src={d.img} alt="..." className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                    <a
                      href="https://www.linkedin.com/in/asalef-alena-a043251ba/"
                      target="_blank"
                    rel="nofollow"
                    
                    >
                    <i style={{fontSize:"50px"}} className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  );
};
