import { useNavigate } from "react-router-dom";
import { Button } from "../../common/buttons";

export default function EmptyState({
  message,
  isLoading = false,
}: {
  message?: string;
  isLoading?: Boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col text-center align-middle bg-gray-100 py-24 rounded-xl">
      <p className="text-xl mb-4">{message || "Your inventory is empty"}</p>
      {!isLoading && (
        <div className="w-52 mx-auto mt-4">
          <Button onClick={() => navigate("/store")} variant="dark">
            In Store
          </Button>
        </div>
      )}
    </div>
  );
}
