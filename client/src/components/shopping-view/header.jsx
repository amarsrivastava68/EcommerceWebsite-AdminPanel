import React, { useState } from 'react'
import { HousePlug, Menu , ShoppingCart , LogOut, UserCog, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet , SheetTitle, SheetContent, SheetHeader , SheetDescription ,SheetTrigger} from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu , DropdownMenuTrigger  , DropdownMenuContent, DropdownMenuLabel , DropdownMenuSeparator , DropdownMenuItem} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'



function MenuItems (){
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link to = {menuItem.path}
          key={menuItem.id}
        >
         <div         className='border-gray-500 p-2 border-dotted hover:bg-gray-200 border-rounded-xl'
         >{menuItem.label}</div> 
        </Link>
      ))}
    </nav>
  );

}
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet , setOpenCartSheet]= useState(false)
  function handleLogout() {
    dispatch(logoutUser());
  }

 

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
   <ShoppingCart className="w-6 h-6" />

          <span className="sr-only">User cart</span>
        </Button>
       
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className='h-3 w-3'/>
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
<LogOut className='h-3 w-3'/>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
    <div className="flex h-16 items-center justify-between px-4 md:px-6">
      <Link to="/shop/home" className="flex items-center gap-2">
        <HousePlug className="h-6 w-6" />
        <span className="font-bold">Ecommerce</span>
      </Link>
      <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
          <SheetHeader>
    <SheetDescription></SheetDescription>
  </SheetHeader>  
          <SheetTitle></SheetTitle> 
          <MenuItems/>
          <HeaderRightContent/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
      </header>
  )
}

export default ShoppingHeader