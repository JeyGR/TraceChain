import React from "react";
import SingleCard from "./SingleCard";

const QUICKDATA = [
  {
    id: "23445433rdfcd",
    productName: "Something",
    img: "https://images.unsplash.com/photo-1737311208394-57fc870cfd94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    company: "abc company",
  },
  {
    id: "23445433rdfcd",
    productName: "Something",
    img: "https://images.unsplash.com/photo-1737311208394-57fc870cfd94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    company: "abc company",
  },
  {
    id: "23445433rdfcd",
    productName: "Something",
    img: "https://images.unsplash.com/photo-1737311208394-57fc870cfd94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    company: "abc company",
  },
  {
    id: "23445433rdfcd",
    productName: "Something",
    img: "https://images.unsplash.com/photo-1737311208394-57fc870cfd94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    company: "abc company",
  },
  {
    id: "23445433rdfcd",
    productName: "Something",
    img: "https://images.unsplash.com/photo-1737311208394-57fc870cfd94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    company: "abc company",
  },
  {
    id: "23445433rdfcd",
    productName: "Something",
    img: "https://images.unsplash.com/photo-1737311208394-57fc870cfd94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    company: "abc company",
  },
  {
    id: "23445433rdfcd",
    productName: "Something",
    img: "https://images.unsplash.com/photo-1737311208394-57fc870cfd94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    company: "abc company",
  },
];

const CardSection = () => {
  return (
    <div className="w-full  -z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5">
        {QUICKDATA?.map((data, index) => {
          return (
            <SingleCard
              id={data?.id}
              pName={data?.productName}
              img={data?.img}
              company={data?.company}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardSection;
