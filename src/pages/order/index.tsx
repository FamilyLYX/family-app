import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/buttons';

export function Order() {
  // const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="mt-24">
      <h2 className="long-title text-center text-8xl">Thank You</h2>
      <div className="max-w-lg mx-auto text-center space-y-4 mt-4 flex flex-col gap-5">
        <p>
          Your support means the world to us, and we're thrilled to have you
          join us on this exciting journey at the intersection of fashion and
          technology.
        </p>
        <p>
          As we pour our passion into crafting each product with meticulous
          care, please allow up to 30 business days for your order to be
          lovingly manufactured and delivered to your doorstep.
        </p>
        <p>
          Should you have any questions, concerns, or just want to say hello,
          feel free to reach out to our dedicated support team at{' '}
          <a className="font-bold" href="mailto:support@familylyx.com">
            support@familylyx.com
          </a>
        </p>

        <div className="flex justify-center">
          <svg
            width="82"
            height="82"
            viewBox="0 0 82 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="82" height="82" rx="41" fill="#00C113" />
            <path
              d="M55 30.5L35.75 49.75L27 41"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <Button variant="dark" onClick={() => navigate('/store')}>
          Home
        </Button>
      </div>
    </div>
  );
}
