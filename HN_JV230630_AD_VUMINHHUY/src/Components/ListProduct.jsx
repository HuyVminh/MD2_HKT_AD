import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function ListProduct({ list, cart, setCart }) {
  const newList = [...list];
  const handleAddCart = (id) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === id);
    const itemAdd = newList.find((item) => item.id === id);
    if (index === -1) {
      newCart.push({
        id: itemAdd.id,
        name: itemAdd.name,
        price: itemAdd.price,
        count: 1,
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    } else {
      newCart[index].count++;
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    }
  };
  return (
    <div className="flex flex-wrap gap-5 justify-center mt-5">
      {newList.map((item, i) => {
        return (
          <Card className="w-96" key={i}>
            <CardHeader shadow={false} floated={false} className="h-96">
              <img
                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-bold text-lg">
                  {item.name}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  {Number(item.price).toLocaleString('vi-VN')} đ
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                ripple={false}
                fullWidth={true}
                onClick={() => handleAddCart(item.id)}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  );
}
