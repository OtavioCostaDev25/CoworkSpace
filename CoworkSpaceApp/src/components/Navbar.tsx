import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { AccountCircle, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box sx={{ width: 260, p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        CoworkSpace
      </Typography>
      <List>
        <ListItemButton onClick={() => handleNavigate('/rooms')}>
          <ListItemText primary="Salas" />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigate('/rooms/my')}>
          <ListItemText primary="Minhas salas" />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigate('/bookings')}>
          <ListItemText primary="Minhas reservas" />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigate('/bookings/my-rooms')}>
          <ListItemText primary="Reservas das minhas salas" />
        </ListItemButton>

        {user?.role === 'admin' && (
          <>
            <ListItemButton onClick={() => handleNavigate('/admin/rooms')}>
              <ListItemText primary="Admin salas" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate('/admin/bookings')}>
              <ListItemText primary="Admin reservas" />
            </ListItemButton>
          </>
        )}
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItemButton onClick={() => handleNavigate('/profile')}>
          <ListItemText primary={user?.name || 'Perfil'} />
        </ListItemButton>
        <ListItemButton onClick={handleLogout}>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer', flexGrow: 1, fontWeight: 'bold' }}
          onClick={() => navigate('/rooms')}
        >
          CoworkSpace
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
              <Menu />
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button color="inherit" onClick={() => navigate('/rooms')}>Salas</Button>
            <Button color="inherit" onClick={() => navigate('/rooms/my')}>Minhas salas</Button>
            <Button color="inherit" onClick={() => navigate('/bookings')}>Minhas reservas</Button>
            <Button color="inherit" onClick={() => navigate('/bookings/my-rooms')}>Reservas das minhas salas</Button>

            {user?.role === 'admin' && (
              <>
                <Button color="inherit" onClick={() => navigate('/admin/rooms')}>Admin salas</Button>
                <Button color="inherit" onClick={() => navigate('/admin/bookings')}>Admin reservas</Button>
              </>
            )}

            <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'rgba(255,255,255,0.3)' }} />

            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
              onClick={() => navigate('/profile')}
            >
              <AccountCircle />
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {user?.name}
              </Typography>
            </Box>

            <Button color="inherit" onClick={handleLogout}>Sair</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}