import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    CircularProgress,
    IconButton,
    Tooltip,
    TextField,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Chip,
    Divider
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Close as CloseIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import './HESPage.css';

const HESPage = () => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModuleDialog, setShowModuleDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState(null);

    const modules = useMemo(() => [
        {
            name: 'TMMS',
            submodules: ['DTR COMMUNICATION', 'SETTINGS'],
            description: 'Transformer Monitoring and Management System',
            status: 'active',
            lastUpdated: '2024-03-15',
            version: '2.1.0'
        },
        {
            name: 'METER',
            submodules: ['METER COMMUNICATION', 'SETTINGS'],
            description: 'Meter Management System',
            status: 'active',
            lastUpdated: '2024-03-10',
            version: '1.5.0'
        },
        {
            name: 'AMS',
            submodules: ['DTR LIST', 'TMU LIST', 'METER LIST', 'SIM LIST', 'NOP', 'MANUFACTURER LIST'],
            description: 'Asset Management System',
            status: 'maintenance',
            lastUpdated: '2024-03-12',
            version: '3.0.0'
        },
        {
            name: 'HIERARCHY',
            submodules: ['FEEDER LIST', 'HIERARCHY LIST'],
            description: 'System Hierarchy Management',
            status: 'active',
            lastUpdated: '2024-03-08',
            version: '1.2.0'
        },
        {
            name: 'CIS',
            submodules: ['CONSUMER LIST', 'SERVICE CONNECTION LIST'],
            description: 'Consumer Information System',
            status: 'active',
            lastUpdated: '2024-03-14',
            version: '2.3.0'
        },
        {
            name: 'USER',
            submodules: ['USER DETAILS LIST', 'ASSIGNING ROLES'],
            description: 'User Management System',
            status: 'active',
            lastUpdated: '2024-03-09',
            version: '1.1.0'
        },
        {
            name: 'GIS',
            submodules: ['GIS ADMIN'],
            description: 'Geographic Information System',
            status: 'maintenance',
            lastUpdated: '2024-03-11',
            version: '2.0.0'
        },
        {
            name: 'SCHEDULER',
            submodules: [],
            description: 'Task Scheduling System',
            status: 'active',
            lastUpdated: '2024-03-13',
            version: '1.0.0'
        }
    ], []);

    const filteredModules = useMemo(() => {
        return modules.filter(module =>
            module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            module.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [modules, searchQuery]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'maintenance':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <CheckCircleIcon color="success" />;
            case 'maintenance':
                return <WarningIcon color="warning" />;
            default:
                return <InfoIcon color="info" />;
        }
    };

    const handleModuleClick = (module) => {
        setSelectedModule(module);
        setShowModuleDialog(true);
    };

    const handleSubmoduleClick = (submodule) => {
        // TODO: Implement submodule navigation
        console.log(`Navigating to ${submodule}`);
    };

    const handleAddModule = () => {
        // TODO: Implement add module functionality
        console.log('Adding new module');
    };

    const handleEditModule = (module, e) => {
        e.stopPropagation();
        // TODO: Implement edit module functionality
        console.log(`Editing module: ${module.name}`);
    };

    const handleDeleteModule = (module, e) => {
        e.stopPropagation();
        setModuleToDelete(module);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        // TODO: Implement delete module functionality
        console.log(`Deleting module: ${moduleToDelete.name}`);
        setShowDeleteDialog(false);
        setModuleToDelete(null);
    };

    if (isLoading) {
        return (
            <Box className="loading-spinner">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box className="hes-container">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" className="hes-header">
                    HES Module Management
                </Typography>
                <TextField
                    placeholder="Search modules..."
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: 300 }}
                />
            </Box>

            <Grid container spacing={3}>
                {filteredModules.map((module) => (
                    <Grid item xs={12} sm={6} md={4} key={module.name}>
                        <Paper
                            className="module-card"
                            sx={{
                                p: 2,
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleModuleClick(module)}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" className="module-title">
                                    {module.name}
                                </Typography>
                                <Box>
                                    <Tooltip title="Edit Module">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleEditModule(module, e)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Module">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleDeleteModule(module, e)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                {getStatusIcon(module.status)}
                                <Chip
                                    label={module.status.toUpperCase()}
                                    color={getStatusColor(module.status)}
                                    size="small"
                                    sx={{ ml: 1 }}
                                />
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {module.description}
                            </Typography>

                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                Version: {module.version} | Last Updated: {module.lastUpdated}
                            </Typography>

                            <Divider sx={{ my: 1 }} />

                            {module.submodules.map((submodule) => (
                                <Button
                                    key={submodule}
                                    variant="outlined"
                                    fullWidth
                                    className="submodule-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSubmoduleClick(submodule);
                                    }}
                                >
                                    {submodule}
                                </Button>
                            ))}
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Module Details Dialog */}
            <Dialog
                open={showModuleDialog}
                onClose={() => setShowModuleDialog(false)}
                maxWidth="md"
                fullWidth
            >
                {selectedModule && (
                    <>
                        <DialogTitle>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {selectedModule.name} Details
                                <IconButton onClick={() => setShowModuleDialog(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        {getStatusIcon(selectedModule.status)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Status"
                                        secondary={
                                            <Chip
                                                label={selectedModule.status.toUpperCase()}
                                                color={getStatusColor(selectedModule.status)}
                                                size="small"
                                            />
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Description"
                                        secondary={selectedModule.description}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Version"
                                        secondary={selectedModule.version}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Last Updated"
                                        secondary={selectedModule.lastUpdated}
                                    />
                                </ListItem>
                            </List>
                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                Submodules
                            </Typography>
                            <Grid container spacing={1}>
                                {selectedModule.submodules.map((submodule) => (
                                    <Grid item xs={12} sm={6} key={submodule}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            className="submodule-button"
                                            onClick={() => handleSubmoduleClick(submodule)}
                                        >
                                            {submodule}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </DialogContent>
                    </>
                )}
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
            >
                <DialogTitle>Delete Module</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the module "{moduleToDelete?.name}"?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            <Tooltip title="Add New Module">
                <Button
                    variant="contained"
                    color="primary"
                    className="add-module-button"
                    onClick={handleAddModule}
                >
                    <AddIcon />
                </Button>
            </Tooltip>
        </Box>
    );
};

export default HESPage; 