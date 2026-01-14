"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, ShieldCheck, User as UserIcon, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/register");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getSafeProfileImage = (url: string) => {
    if (!url || url.includes("googleusercontent.com/profile/picture/0")) {
      return `https://ui-avatars.com/api/?name=User&background=random`;
    }
    return url;
  };

  // --- রোল পরিবর্তন হ্যান্ডলার (SweetAlert সহ) ---
  const toggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    // ১. প্রথমে কনফার্মেশন চাইবে
    Swal.fire({
      title: "Change User Role?",
      text: `Are you sure you want to change this user to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FB923C",
      cancelButtonColor: "#a6adbb",
      confirmButtonText: `Yes, make ${newRole}`,
      background: "#1d232a",
      color: "#ffffff",
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl font-bold uppercase tracking-widest px-6'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const tId = toast.loading(`Updating to ${newRole}...`);

        try {
          const res = await fetch(`/api/register`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, role: newRole }),
          });

          if (res.ok) {
            setUsers((prev) =>
              prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
            );
            
            // ২. সফল হলে SweetAlert সাকসেস মেসেজ
            Swal.fire({
              title: "Updated!",
              text: `The user is now an ${newRole}.`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              background: "#1d232a",
              color: "#ffffff",
              borderRadius: "2rem",
            });
            toast.dismiss(tId);
          } else {
            throw new Error();
          }
        } catch (error) {
          toast.error("Failed to update role", { id: tId });
        }
      }
    });
  };

  // ডিলিট হ্যান্ডলার
  const handleDeleteUser = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87272",
      cancelButtonColor: "#a6adbb",
      confirmButtonText: "Yes, delete!",
      background: "#1d232a",
      color: "#ffffff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/register?id=${id}`, { method: "DELETE" });
          if (res.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== id));
            Swal.fire({
              title: "Deleted!",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              background: "#1d232a",
              color: "#ffffff",
            });
          }
        } catch (error) {
          toast.error("Failed to delete user");
        }
      }
    });
  };

  if (loading) return (
    <div className="flex flex-col h-64 items-center justify-center gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="font-black uppercase tracking-widest text-xs opacity-50">Loading Users...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black tracking-tight">
          Manage <span className="text-primary">Users</span>
        </h1>
        <p className="text-sm text-neutral/50 font-bold uppercase tracking-widest">
          Control access levels & user accounts
        </p>
      </header>

      <div className="bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr className="text-neutral/70 uppercase text-[10px] tracking-[0.2em]">
                <th className="py-5 pl-8">User Info</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Joined Date</th>
                <th className="text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-primary/5 transition-colors">
                  <td className="pl-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 border border-base-content/10">
                          <Image
                            src={getSafeProfileImage(user.image)}
                            alt="User"
                            width={48}
                            height={48}
                            unoptimized
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-black">{user.fullName || user.name}</div>
                        <div className="text-[10px] opacity-40 flex items-center gap-1 lowercase">
                          <Mail size={10} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => toggleRole(user._id, user.role)}
                      className={`badge gap-2 transition-all active:scale-95 ${
                        user.role === "admin" 
                        ? "badge-primary text-white" 
                        : "badge-ghost opacity-60"
                      } font-bold text-[10px] uppercase h-7 px-4 border-none`}
                    >
                      {user.role === "admin" ? <ShieldCheck size={12} /> : <UserIcon size={12} />}
                      {user.role}
                    </button>
                  </td>
                  <td className="text-[11px] opacity-70">
                    {user.phone || user.contact || "N/A"}
                  </td>
                  <td className="text-[10px] opacity-40 uppercase">
                    {user.createdAt ? new Date(user.createdAt).toDateString() : "Unknown"}
                  </td>
                  <td className="text-right pr-8">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-ghost btn-sm btn-square hover:text-error transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;