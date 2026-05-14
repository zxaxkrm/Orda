import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle, Circle } from "lucide-react";

const STEPS = ["pending", "processing", "shipped", "delivered"];

export default async function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) return notFound();

  const currentStep = STEPS.indexOf(order.status);

  return (
    <div className="sm:px-23 px-4 py-10 space-y-8">
      
      <div className="border-b pb-3 flex justify-between items-center">
        <h1 className="font-bold text-2xl">
          Order #{order.id.slice(-6).toUpperCase()}
        </h1>
        <p className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Order Tracking</h2>
        <div className="flex items-center gap-0">
          {STEPS.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isLast = index === STEPS.length - 1;

            return (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-[#5d00d6]" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                  <span className={`text-xs capitalize ${isCompleted ? "text-[#5d00d6] font-medium" : "text-gray-400"}`}>
                    {step}
                  </span>
                </div>
                {!isLast && (
                  <div className={`h-0.5 flex-1 mb-4 ${index < currentStep ? "bg-[#5d00d6]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        
        {order.status === "cancelled" && (
          <p className="text-sm text-red-500 mt-2">This order has been cancelled.</p>
        )}
      </div>

      
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Order Summary</h2>
        <div className="border rounded-xl overflow-hidden">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border-b last:border-0 text-sm py-3 px-4">
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={60}
                height={60}
                className="bg-[#e3e3e3] rounded-md object-contain"
              />
              <p className="flex-1">{item.title}</p>
              <p className="text-gray-500">x{item.quantity}</p>
              <p className="font-medium">${item.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="flex justify-between items-center border-t pt-4">
        <p className="font-semibold">Total</p>
        <p className="font-bold text-lg">${order.total.toLocaleString()}</p>
      </div>

     
      {order.paymentReference && (
        <p className="text-xs text-gray-400">
          Payment ref: {order.paymentReference}
        </p>
      )}
    </div>
  );
}