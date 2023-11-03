import { useNavigate } from "react-router-dom";
import { Button } from "../../common/buttons";

export function Order() {
  // const { id } = useParams();
  const navigate = useNavigate();

  return <div className="mt-24">
    <h2 className="long-title text-center text-8xl">Thank You</h2>
    <div className="max-w-md mx-auto text-center space-y-4 mt-4">
      <p>As each order are uniquely crafted, we anticipate it to be ready for shipping by XX/XX/202X. Once dispatched, tracking details will be promptly forwarded to test@gmail.com, ensuring you can monitor its journey to you.</p>
      <p>Upon receiving your garment, you can unlock your exclusive NFT by simply scanning the 'Honft' Badge on the product.</p>
      <Button variant="dark" onClick={() => navigate('/store')}>Back to store</Button>
    </div>
  </div>
}