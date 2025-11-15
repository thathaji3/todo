
// "use client";
// import React, { useEffect, useState } from "react";
// import { create } from "zustand";

// // ✅ Define TypeScript types
// interface Todo {
//   id: string;
//   title: string;
//   description: string;
//   completed: boolean;
// }

// type TodoStore = {
//   todos: Todo[];
//   editingId: string | null;
//   fetchTodos: () => Promise<void>;
//   addTodo: (title: string, description: string) => Promise<void>;
//   toggleTodo: (id: string) => Promise<void>;
//   deleteTodo: (id: string) => Promise<void>;
//   startEdit: (id: string) => void;
//   cancelEdit: () => void;
//   editTodo: (id: string, newTitle: string, newDescription: string) => Promise<void>;
// };

// // ✅ Zustand Store
// const useTodoStore = create<TodoStore>((set, get) => ({
//   todos: [],
//   editingId: null,

//   // Fetch all todos from API
//   fetchTodos: async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/todo");
//       const data = await res.json();
//       set({ todos: data });
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   },

//   // Add new todo
//   addTodo: async (title: string, description: string) => {
//     try {
//       const res = await fetch("http://localhost:3000/api/todo", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, description }),
//       });
//       const data = await res.json();
//       set((state) => ({ todos: [...state.todos, data] }));
//     } catch (error) {
//       console.error("Add error:", error);
//     }
//   },

//   // Toggle complete status
//   toggleTodo: async (id: string) => {
//     try {
//       const todo = get().todos.find((t) => t.id === id);
//       if (!todo) return;

//       await fetch(`http://localhost:3000/api/todo/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: todo.title,
//           description: todo.description,
//           completed: !todo.completed,
//         }),
//       });

//       set((state) => ({
//         todos: state.todos.map((t) =>
//           t.id === id ? { ...t, completed: !t.completed } : t
//         ),
//       }));
//     } catch (e) {
//       console.error("Toggle error:", e);
//     }
//   },

//   // Delete todo
//   deleteTodo: async (id: string) => {
//     try {
//       await fetch(`http://localhost:3000/api/todo/${id}`, {
//         method: "DELETE",
//       });

//       set((state) => ({
//         todos: state.todos.filter((todo) => todo.id !== id),
//       }));
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   },

//   // Start edit
//   startEdit: (id: string) => set({ editingId: id }),

//   // Cancel edit
//   cancelEdit: () => set({ editingId: null }),

//   // Edit a todo
//   editTodo: async (id, newTitle, newDescription) => {
//     try {
//       await fetch(`http://localhost:3000/api/todo/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newTitle,
//           description: newDescription,
//         }),
//       });

//       set((state) => ({
//         todos: state.todos.map((todo) =>
//           todo.id === id
//             ? { ...todo, title: newTitle, description: newDescription }
//             : todo
//         ),
//         editingId: null,
//       }));
//     } catch (error) {
//       console.error("Edit error:", error);
//     }
//   },
// }));

// // ✅ React Component
// export default function Page() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [editTitle, setEditTitle] = useState("");
//   const [editDescription, setEditDescription] = useState("");

//   const {
//     todos,
//     editingId,
//     fetchTodos,
//     addTodo,
//     toggleTodo,
//     deleteTodo,
//     startEdit,
//     cancelEdit,
//     editTodo,
//   } = useTodoStore();

//   // Load todos when the page loads
//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim()) return;
//     await addTodo(title, description);
//     setTitle("");
//     setDescription("");
//   };

//   const handleEditSubmit = (e: React.FormEvent, id: string) => {
//     e.preventDefault();
//     if (!editTitle.trim() || !editDescription.trim()) return;
//     editTodo(id, editTitle, editDescription);
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-300 to-purple-700  flex justify-center items-center h-screen p-10">
//     <div className="w-1/3 h-1/2 mx-auto mt-12 p-6 bg-amber-400 shadow-xl rounded-3xl">
//       <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>

//       {/* Add Todo Form */}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="border bg-amber-200 rounded px-3 py-2 w-full"
//           placeholder="Enter title..."
//         />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border rounded bg-amber-300 px-3 py-2 w-full"
//           placeholder="Enter description..."
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Task
//         </button>
//       </form>

//       {/* Todo List */}
//       <ul className="space-y-3">
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             className="p-3 bg-amber-100 rounded flex flex-col gap-2 shadow-sm"
//           >
//             {editingId === todo.id ? (
//               <form
//                 onSubmit={(e) => handleEditSubmit(e, todo.id)}
//                 className="flex flex-col gap-2"
//               >
//                 <input
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                   className="border rounded px-2 py-1"
//                   placeholder="Edit title..."
//                 />
//                 <textarea
//                   value={editDescription}
//                   onChange={(e) => setEditDescription(e.target.value)}
//                   className="border rounded px-2 py-1"
//                   placeholder="Edit description..."
//                 />
//                 <div className="flex justify-end gap-3">
//                   <button type="submit" className="text-green-600 font-medium">
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     onClick={cancelEdit}
//                     className="text-gray-600"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <>
//                 <div
//                   onClick={() => toggleTodo(todo.id)}
//                   className={`cursor-pointer ${
//                     todo.completed
//                       ? "line-through text-gray-400"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   <h3 className="font-semibold">{todo.title}</h3>
//                   <p className="text-sm">{todo.description}</p>
//                 </div>
//                 <div className="flex justify-end gap-3 text-sm">
//                   <button
//                     className="text-yellow-600 hover:underline"
//                     onClick={() => {
//                       startEdit(todo.id);
//                       setEditTitle(todo.title);
//                       setEditDescription(todo.description);
//                     }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="text-red-600 hover:underline"
//                     onClick={() => deleteTodo(todo.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//     </div>
//   );
// }





"use client";

import React, { useEffect, useState } from "react";
import { create } from "zustand";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

type TodoStore = {
  todos: Todo[];
  editingId: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string, description: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  startEdit: (id: string) => void;
  cancelEdit: () => void;
  editTodo: (
    id: string,
    newTitle: string,
    newDescription: string
  ) => Promise<void>;
};

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  editingId: null,

  fetchTodos: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/todo");
      const data = await res.json();
      set({ todos: data });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  },

  addTodo: async (title, description) => {
    try {
      const res = await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      set((state) => ({ todos: [...state.todos, data] }));
    } catch (error) {
      console.error("Add error:", error);
    }
  },

  toggleTodo: async (id) => {
    try {
      const todo = get().todos.find((t) => t.id === id);
      if (!todo) return;

      await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          completed: !todo.completed,
        }),
      });

      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      }));
    } catch (e) {
      console.error("Toggle error:", e);
    }
  },

  deleteTodo: async (id) => {
    try {
      await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error("Delete error:", error);
    }
  },

  startEdit: (id) => set({ editingId: id }),
  cancelEdit: () => set({ editingId: null }),

  editTodo: async (id, newTitle, newDescription) => {
    try {
      await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id
            ? { ...todo, title: newTitle, description: newDescription }
            : todo
        ),
        editingId: null,
      }));
    } catch (error) {
      console.error("Edit error:", error);
    }
  },
}));

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const {
    todos,
    editingId,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEdit,
    cancelEdit,
    editTodo,
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    await addTodo(title, description);
    setTitle("");
    setDescription("");
  };

  const handleEditSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!editTitle.trim() || !editDescription.trim()) return;
    editTodo(id, editTitle, editDescription);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-gray-800 to-black p-4">

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-3xl shadow-2xl px-8 py-6 rounded-3xl border border-white/20 text-black">

        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow mb-6">
          Elegant Todo App
        </h1>

        {/* Add Todo */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-5 bg-white rounded-xl shadow-xl border border-gray-300"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-black focus:ring-2 focus:ring-black outline-none"
            placeholder="Enter task title..."
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-black focus:ring-2 focus:ring-black outline-none"
            placeholder="Enter description..."
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            + Add Task
          </button>
        </form>

        {/* Todo List */}
        <ul className="mt-6 flex flex-col gap-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white rounded-xl p-5 shadow-xl border border-gray-300 transition hover:shadow-2xl"
            >
              {editingId === todo.id ? (
                <form
                  onSubmit={(e) => handleEditSubmit(e, todo.id)}
                  className="flex flex-col gap-3 text-black"
                >
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="p-2 rounded bg-gray-100 border border-gray-300"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="p-2 rounded bg-gray-100 border border-gray-300"
                  />

                  <div className="flex gap-6 justify-end pt-2">
                    <button className="text-green-700 font-semibold">Save</button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div
                    onClick={() => toggleTodo(todo.id)}
                    className={`cursor-pointer ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-black"
                    }`}
                  >
                    <h3 className="text-2xl font-bold">{todo.title}</h3>
                    <p className="text-sm mt-1">{todo.description}</p>
                  </div>

                  <div className="flex justify-end gap-6 mt-4 text-black font-medium">
                    <button
                      onClick={() => {
                        startEdit(todo.id);
                        setEditTitle(todo.title);
                        setEditDescription(todo.description);
                      }}
                      className="hover:underline text-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="hover:underline text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}







// "use client";
// import React, { useEffect, useState } from "react";
// import { create } from "zustand";

// // ✅ Define TypeScript types
// interface Todo {
//   id: string;
//   title: string;
//   description: string;
//   completed: boolean;
// }

// type TodoStore = {
//   todos: Todo[];
//   editingId: string | null;
//   fetchTodos: () => Promise<void>;
//   addTodo: (title: string, description: string) => Promise<void>;
//   toggleTodo: (id: string) => Promise<void>;
//   deleteTodo: (id: string) => Promise<void>;
//   startEdit: (id: string) => void;
//   cancelEdit: () => void;
//   editTodo: (id: string, newTitle: string, newDescription: string) => Promise<void>;
// };

// // ✅ Zustand Store
// const useTodoStore = create<TodoStore>((set, get) => ({
//   todos: [],
//   editingId: null,

//   // Fetch all todos
//   fetchTodos: async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/todo");
//       const data = await res.json();
//       set({ todos: data });
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   },

//   // Add todo
//   addTodo: async (title, description) => {
//     try {
//       const res = await fetch("http://localhost:3000/api/todo", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, description }),
//       });
//       const data = await res.json();
//       set((state) => ({ todos: [...state.todos, data] }));
//     } catch (error) {
//       console.error("Add error:", error);
//     }
//   },

//   // Toggle complete
//   toggleTodo: async (id) => {
//     try {
//       const todo = get().todos.find((t) => t.id === id);
//       if (!todo) return;

//       await fetch(`http://localhost:3000/api/todo/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: todo.title,
//           description: todo.description,
//           completed: !todo.completed,
//         }),
//       });

//       set((state) => ({
//         todos: state.todos.map((t) =>
//           t.id === id ? { ...t, completed: !t.completed } : t
//         ),
//       }));
//     } catch (e) {
//       console.error("Toggle error:", e);
//     }
//   },

//   // Delete todo
//   deleteTodo: async (id) => {
//     try {
//       await fetch(`http://localhost:3000/api/todo/${id}`, {
//         method: "DELETE",
//       });

//       set((state) => ({
//         todos: state.todos.filter((todo) => todo.id !== id),
//       }));
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   },

//   // Start edit
//   startEdit: (id) => set({ editingId: id }),

//   // Cancel edit
//   cancelEdit: () => set({ editingId: null }),

//   // Edit todo
//   editTodo: async (id, newTitle, newDescription) => {
//     try {
//       await fetch(`http://localhost:3000/api/todo/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: newTitle, description: newDescription }),
//       });

//       set((state) => ({
//         todos: state.todos.map((todo) =>
//           todo.id === id
//             ? { ...todo, title: newTitle, description: newDescription }
//             : todo
//         ),
//         editingId: null,
//       }));
//     } catch (error) {
//       console.error("Edit error:", error);
//     }
//   },
// }));

// // ✅ React Component (Responsive UI)
// export default function Page() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [editTitle, setEditTitle] = useState("");
//   const [editDescription, setEditDescription] = useState("");

//   const {
//     todos,
//     editingId,
//     fetchTodos,
//     addTodo,
//     toggleTodo,
//     deleteTodo,
//     startEdit,
//     cancelEdit,
//     editTodo,
//   } = useTodoStore();

//   // Load todos on page load
//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim()) return;
//     await addTodo(title, description);
//     setTitle("");
//     setDescription("");
//   };

//   const handleEditSubmit = (e: React.FormEvent, id: string) => {
//     e.preventDefault();
//     if (!editTitle.trim() || !editDescription.trim()) return;
//     editTodo(id, editTitle, editDescription);
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-300 to-purple-700 min-h-screen flex justify-center items-center p-4 sm:p-6 lg:p-10">
//       <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 bg-amber-400 shadow-xl rounded-3xl">

//         <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
//           📝 Todo List
//         </h1>

//         {/* Add Todo Form */}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border bg-amber-200 rounded px-3 py-2 w-full text-base md:text-lg"
//             placeholder="Enter title..."
//           />

//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="border rounded bg-amber-300 px-3 py-2 w-full text-base md:text-lg"
//             placeholder="Enter description..."
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
//           >
//             Add Task
//           </button>
//         </form>

//         {/* Todo List */}
//         <ul className="space-y-4">
//           {todos.map((todo) => (
//             <li
//               key={todo.id}
//               className="p-4 bg-amber-100 rounded-lg flex flex-col gap-2 shadow-md"
//             >
//               {editingId === todo.id ? (
//                 <form
//                   onSubmit={(e) => handleEditSubmit(e, todo.id)}
//                   className="flex flex-col gap-2"
//                 >
//                   <input
//                     value={editTitle}
//                     onChange={(e) => setEditTitle(e.target.value)}
//                     className="border rounded px-2 py-1 text-base"
//                     placeholder="Edit title..."
//                   />
//                   <textarea
//                     value={editDescription}
//                     onChange={(e) => setEditDescription(e.target.value)}
//                     className="border rounded px-2 py-1 text-base"
//                     placeholder="Edit description..."
//                   />
//                   <div className="flex justify-end gap-4">
//                     <button type="submit" className="text-green-600 font-semibold">
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={cancelEdit}
//                       className="text-gray-600"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <>
//                   <div
//                     onClick={() => toggleTodo(todo.id)}
//                     className={`cursor-pointer ${
//                       todo.completed
//                         ? "line-through text-gray-400"
//                         : "text-gray-900"
//                     }`}
//                   >
//                     <h3 className="font-semibold text-lg">{todo.title}</h3>
//                     <p className="text-sm md:text-base">{todo.description}</p>
//                   </div>

//                   <div className="flex justify-end gap-4 text-sm md:text-base">
//                     <button
//                       className="text-yellow-600 hover:underline"
//                       onClick={() => {
//                         startEdit(todo.id);
//                         setEditTitle(todo.title);
//                         setEditDescription(todo.description);
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="text-red-600 hover:underline"
//                       onClick={() => deleteTodo(todo.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


