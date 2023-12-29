import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
const Team = () => {
  return (
    <div className="mt-16 bg-neutral py-12 rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
      <hr/>
      <div className="grid md:grid-cols-2 mt-8 lg:grid-cols-3 justify-items-center gap-12 ">
        <div className="">
          <h2 className="text-2xl">Kimberly P</h2>
          <small>Founding editor</small>
          <p>@kimberlypower</p>
          <p><EmailOutlinedIcon className='mr-2'></EmailOutlinedIcon>kimberly@example.com</p>
        </div>
        <div>
          <h2 className="text-2xl">Martin H</h2>
          <small>Senior editor</small>
          <p>@martinhector</p>
          <p><EmailOutlinedIcon className='mr-2'></EmailOutlinedIcon>martin@example.com</p>
        </div>
        <div>
          <h2 className="text-2xl">Harvey S</h2>
          <small>Managing Partner</small>
          <p>@harveryspector</p>
          <p><EmailOutlinedIcon className='mr-2'></EmailOutlinedIcon>harvey@example.com</p>
        </div>
        <div>
          <h2 className="text-2xl">Michael J </h2>
          <small>Marketing Head</small>
          <p>@michaeljosh</p>
          <p><EmailOutlinedIcon className='mr-2'></EmailOutlinedIcon>mike@example.com</p>
        </div>
        <div>
          <h2 className="text-2xl">Rachel Z</h2>
          <small>Digital Content Strategist</small>
          <p>@rachelzoe</p>
          <p><EmailOutlinedIcon className='mr-2'></EmailOutlinedIcon>rachel@example.com</p>
        </div>
        <div>
          <h2 className="text-2xl">Donna P</h2>
          <small>Human Resource</small>
          <p>@donnapearson</p>
          <p><EmailOutlinedIcon className='mr-2'></EmailOutlinedIcon>donna@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
