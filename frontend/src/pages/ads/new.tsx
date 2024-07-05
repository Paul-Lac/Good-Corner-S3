import {
  useGetAllCategoryQuery,
  usePublishAdMutation,
} from "@/generated/graphql-types";
import { useForm } from "react-hook-form";

type Category = {
  id: string;
  name: string;
};

export interface CreateAdFormData {
  title: string;
  price?: number;
  description?: string;
}

const NewAd = () => {
  const {
    data: categoriesResult,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoryQuery();

  const [publishAd, { loading, data, error }] = usePublishAdMutation();

  const { register, handleSubmit } = useForm<CreateAdFormData>();

  async function onFormSubmitted(formData: CreateAdFormData) {
    console.log("on form submitted", formData);
    await publishAd({
      variables: {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        categoryName: "Yoyo",
      },
    });
  }
  if (categoriesLoading) {
    return <p>Loading...</p>;
  }

  if (categoriesError) {
    return <p>Error: {categoriesError.message}</p>;
  }

  console.log("mutation data", loading, data, error);
  const categories: Category[] = categoriesResult!.getAllCategories;

  return (
    <>
      <h1>Créer une annonce</h1>

      {data && data.publishAd && (
        <div>Lannonce a bien été créée : {data.publishAd.title}</div>
      )}

      <form onSubmit={handleSubmit(onFormSubmitted)}>
        {/* Title */}
        <input
          className="text-field"
          type="text"
          {...register("title", { required: true })}
          placeholder="Saisissez un titre pour l'annonce..."
        />
        <br />
        {/* Price */}
        Prix :
        <input
          className="text-field"
          type="number"
          {...register("price", { valueAsNumber: true, min: 1, max: 10000 })}
        />
        <br />
        {/* Description */}
        Description :
        <textarea
          className="text-field"
          {...register("description")}
        ></textarea>
        <br />
        {/* Category */}
        <select name="category">
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default NewAd;
