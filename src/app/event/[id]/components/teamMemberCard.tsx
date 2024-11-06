import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; 
import { User } from "@/types/project";

interface TeamMemberCardProps {
    member: User;
    onRemove?: () => void; // Optional prop for a delete/remove button
  }
  
  const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onRemove }) => {
    return (   
      <Box
        display="flex"
        alignItems="center"
        p={2}
        borderRadius={1}
        boxShadow={1}
        bgcolor="background.paper"
        gap={2}
        sx={{ maxWidth: 400 }}
      >
        {/* Avatar for team member, fallback to initials if no avatar */}
        {member && (
        <Avatar src={member.avatarUrl} alt={member.name} sx={{ width: 48, height: 48 }}>
          {member.name.charAt(0)}
        </Avatar>
        )}
  
        {/* Team member details */}
        {member && (
        <Box flex="1">
          <Typography variant="subtitle1" fontWeight="bold">
            {member.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {member.email}
          </Typography>
        </Box>
        )}
        {onRemove && (
          <IconButton onClick={onRemove} size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    );
  };
  
  export default TeamMemberCard;