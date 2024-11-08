import { Event } from "@/types/events";
import { Project } from "@/types/project";
import { Card, CardContent, CardMedia, Typography, Avatar, Box, Stack, Chip } from "@mui/material";
import { People, DateRange, EmojiEvents } from "@mui/icons-material";
import { useState } from "react";
import Button from "@/components/Button";

interface SubmissionsProps {
  event: Event | undefined;
  submissions: Project[] | undefined;
}

export const Submissions: React.FC<SubmissionsProps> = ({ event, submissions }) => {

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  } 

  const handleBackClick = () => {
    setSelectedProject(null);
  }

  return (
    <Box className="p-4" display="flex" flexDirection="column" alignItems="center">
      
      {
      selectedProject ? (
        <Box display="flex" flexDirection="column" gap={3} sx={{ padding: 4, border: '1px solid #ddd', borderRadius: 2 }}>
          <Button onClick={handleBackClick} variant="contained" color="primary" sx={{ alignSelf: 'flex-start' }}>
            Back to Submissions
          </Button>
            {/* Project Picture */}
            {selectedProject.project_picture && (
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src={URL.createObjectURL(selectedProject.project_picture)}
                  alt="Project"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
      
            {/* Project Details */}
            <Box mb={2}>
              <Typography variant="h5" gutterBottom>Project Info</Typography>
              <Typography><strong>Name:</strong> {selectedProject.project_name}</Typography>
              {/* <Typography><strong>Short Description:</strong> {selectedProject.shortDescription}</Typography> */}
              <Typography><strong>Description:</strong> {selectedProject.description}</Typography>
            </Box>
      
            {/* Additional Details */}
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Additional Details</Typography>
              {/* <Typography><strong>Comment:</strong> {selectedProject.comment}</Typography>
              <Typography><strong>Video Link:</strong> {selectedProject.videoLink}</Typography> */}
            </Box>
      
            {/* GitHub Link */}
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>GitHub Repository</Typography>
              {/* <Typography component="a" href={selectedProject.github} target="_blank" rel="noopener noreferrer" color="primary">
                {selectedProject.github}
              </Typography> */}
            </Box>
      
            {/* Tracks */}
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Tracks</Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {selectedProject.tracks.map((track, index) => (
                  <Chip key={index} label={track} color="primary" />
                ))}
              </Box>
            </Box>
      
            {/* Team Members */}
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Team Members</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {selectedProject.teamMembers.map((member, index) => (
                  <Box key={index} display="flex" flexDirection="column" p={2} sx={{ border: '1px solid #ddd', borderRadius: 1 }}>
                    <Typography variant="body1"><strong>Name:</strong> {member ? member.name : ""}</Typography>
                    <Typography variant="body2" color="textSecondary"><strong>Email:</strong> {member ? member.email : ""}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
      ) :
        (submissions === undefined || submissions.length === 0 ? 
          ( <Typography variant="h6" color="textSecondary">
            No submissions found
          </Typography>)
          : 
          ( <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
            gap={4}
            width="100%"
            maxWidth="1200px"
          >
            {submissions.map((project) => (
              <Card
                key={project._id}
                elevation={4}
                onClick={() => handleCardClick(project)}
                sx={{
                  borderRadius: 1,
                  transition: "0.3s",
                  '&:hover': { boxShadow: 8, transform: 'scale(1.02)' },
                  maxWidth: 350,
                  mx: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* <CardMedia
                  component="img"
                  height="180"
                  image={project.picture || "/default-image.jpg"}
                  alt={`${project.project_name} image`}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                /> */}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {project.project_name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ 
                    display: "-webkit-box",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    mb: 2}}>
                    {project.description}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Chip
                      icon={<People fontSize="small" />}
                      label={`${project.teamMembers.length} Team Members`}
                      variant="outlined"
                      size="small"
                      sx={{ color: "primary.main", fontWeight: "medium" }}
                    />
                    <Chip
                      icon={<DateRange fontSize="small" />}
                      label={new Date(project.createdAt).toLocaleDateString()}
                      variant="outlined"
                      size="small"
                      sx={{ color: "secondary.main", fontWeight: "medium" }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 1 }} alignItems="center" flexWrap="wrap">
                    {project.tracks.map((track, index) => (
                      <Chip
                        key={index}
                        icon={<EmojiEvents fontSize="small" />}
                        label={track}
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "primary.main",
                          fontWeight: "medium",
                          borderRadius: 2,
                          backgroundColor: "#F0F0F0",
                        }}
                      />
                    ))}
                  </Stack>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mt: 2, mb: 1 }}>
                    Team Members
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {project.teamMembers.map((member, index) => (
                      <Avatar key={index} sx={{ bgcolor: "primary.main", color: "white" }}>
                        {member.name.charAt(0).toUpperCase()}
                      </Avatar>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>)
        )
        }
    </Box>
  );
};