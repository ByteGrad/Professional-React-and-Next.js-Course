import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type SearchProps = {
  searchText: string;
  onSearchChange: (newText: string) => void;
};

export default function Search({ searchText, onSearchChange }: SearchProps) {
  return (
    <form
      action="#"
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
