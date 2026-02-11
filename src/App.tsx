import { useEffect, useState } from "react";
import { ApiService } from "./services/api-service";
import { BookCardResponse } from "./models/book-card";
import { MdFavoriteBorder } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import BookModal from "./components/BookModal";

export default function App() {
  let [bookCards, setBookCards] = useState<BookCardResponse[]>([]);
  const [inputText, setInputText] = useState("");
  const [pending, setPending] = useState(false);
  const [open, setIsOpen] = useState(false);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  const filteredBookCards = bookCards.filter((card) =>
    card.title.toLowerCase().includes(inputText.toLowerCase()),
  );

  // async function createBookCard() {
  //   try {
  //     setPending(true);
  //     const request: BookCardRequest = ;
  //     const { data } = ApiService.CreateBookCard(request);
  //     if (data) {
  //       setBookCards((prev) => [...prev, data])
  //     }
  //   } catch (err) {
  //     console.log(err);

  //   } finally {
  //     setPending(false);
  //   }
  // }

  async function deleteBookCard(cardId: string) {
    try {
      setPending(true);
      const userConfirmed = confirm(
        "Are you sure you want to delete this book?",
      );
      const { data } = await ApiService.DeleteBookCard(cardId);
      if (userConfirmed) {
        if (data) {
          setBookCards((prev) => prev.filter((card) => card.id !== data.id));
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    async function getBookCards() {
      try {
        const { data } = await ApiService.GetBookCards();
        if (data) {
          setBookCards(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getBookCards();
  }, []);

  if (inputText) {
    bookCards = filteredBookCards;
  }

  return (
    <div>
      <header className="mb-14 flex h-fit justify-center bg-black pt-4 pb-4">
        <div className="m-auto flex max-w-7xl grow justify-between gap-4">
          <input
            value={inputText}
            type="text"
            placeholder="Search book by name..."
            className="grow rounded-sm border-1 border-gray-400 bg-gray-800 p-2 text-white outline-none focus:ring-2"
            onChange={handleOnChange}
          />
          <button
            onClick={() => setIsOpen(true)}
            className="cursor-pointer rounded-sm border-1 border-gray-400 bg-green-700 pr-8 pl-8 font-semibold text-white hover:bg-green-800"
            disabled={pending}
          >
            Add Book
          </button>
          <BookModal isOpen={open} onClose={() => setIsOpen(false)}>
            <form action="submit">
              <input type="text" placeholder="Book Title" />
              <input type="text" placeholder="Book Author" />
              <input type="text" placeholder="Book Description" />
              <input type="text" placeholder="Book Image URL" />
              <button>Submit</button>
            </form>
          </BookModal>
        </div>
      </header>
      <div className="max-xl:grid-cols5 m-auto mb-32 grid max-w-7xl grid-cols-6 justify-items-center gap-4 max-2xl:grid-cols-5 max-xl:w-[90dvw] max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2">
        {bookCards.map((card, i) => (
          <div
            key={i}
            className="flex grid max-h-[400px] min-h-[400px] max-w-[200px] min-w-[200px] grid-cols-1 rounded-sm border-1 border-gray-400 bg-gray-800 p-2 tracking-tight"
          >
            <img
              // src={card.coverImage}
              src="https://picsum.photos/id/237/200/300"
              alt=""
              className="m-auto max-h-[200px] min-h-[200px] max-w-full min-w-[178px] rounded-sm object-cover"
            />
            <h5 className="font-bold text-white">
              {card.title}
              <br />
              <span className="font-normal text-gray-500">{`By ${card.author}`}</span>
            </h5>
            <p>{card.description}</p>
            <div className="flex">
              <button
                className="cursor-pointer p-1"
                aria-label="Delete Item"
                disabled={pending}
                onClick={() => deleteBookCard(card.id)}
              >
                <BsTrash />
              </button>
              <button
                className="cursor-pointer p-1"
                aria-label="Favorite Item"
                disabled={pending}
              >
                <MdFavoriteBorder />
              </button>
              <button
                className="cursor-pointer p-1"
                aria-label="Edit Item"
                disabled={pending}
              >
                <FaRegEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
