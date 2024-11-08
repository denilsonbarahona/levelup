import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
} from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { Project, Repos } from "@/types/project";
import { Event } from "@/types/events";
import { User } from "@/types/project";
import TeamMemberCard from "./teamMemberCard";
import { createProject } from "@/services/projects";
import { CheckCircleOutline } from "@mui/icons-material";

const steps = ["Project Info", "Project Details", "Preview", "Confirmation"];

interface FormData {
  projectPicture: File | null;
  name: string;
  description: string;
  shortDescription: string;
  comment: string;
  tracks: string[];
  github: string;
  videoLink: string;
  team: string[];
}

interface StepperFormProps {
  _event: Event | undefined;
  userList: User[];
  myUser: User;
  handleSubmitProject: (event: Project) => void;
}

const StepperForm: React.FC<StepperFormProps> = ({ _event, userList, myUser, handleSubmitProject }) => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repos[]>([]);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    projectPicture: null,
    name: "",
    description: "",
    shortDescription: "",
    comment: "",
    tracks: [],
    github: "",
    videoLink: "",
    team: [],
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    shortDescription: false,
    tracks: false,
    comment: false,
    github: false,
    videoLink: false,
  });
  const [file, setFile] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  //Input value for Team Dropdown
  const [inputValue, setInputValue] = useState("");
  const [teamMembers, setTeamMembers] = useState<User[]>([myUser])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, projectPicture: e.target.files[0] });
    }
  };

  const handleNext = () => {
    handleSetTeam();
    setStep((prevStep) => prevStep + 1)
  };
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const handleSetTeam = () => {
    const teamIds = teamMembers.map(member => member._id);
    setFormData({...formData, team: teamIds})
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log("!FORM", formData);
    e.preventDefault();
    const newErrors = {
      name: formData.name === "", 
      description: formData.description === "",
      comment: formData.comment === "",
      shortDescription: formData.shortDescription === "",
      github: formData.github === "",
      videoLink: formData.videoLink === "",
      tracks: formData.tracks === undefined || formData.tracks.length === 0,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      setIsSubmitting(true);
      const payload = {
        event: _event?._id,
        name: formData.name,
        team: formData.team,
        description: formData.description,
        github: formData.github,
        tracks: formData.tracks,
        videoUrl: formData.videoLink,
        shortDescription: formData.shortDescription,
        pictureUrl: formData.projectPicture
      }

      try {
        const response = await createProject(payload)  
        console.log("Form submitted successfully - ", response);
        setStep(3);
        handleSubmitProject(response);
        
      } catch (error) {
        setIsSubmitting(false);
      }
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = () => {
    const errorFields = Object.keys(errors).filter((field) => errors[field as keyof typeof errors]);
    return errorFields.length > 0 
      ? `ERROR - Missing fields: ${errorFields.join(", ")}`
      : "";
  };

  const handleTeamSelect = (event:any, value:User) => {
    if (value) {
      // Check if the selected user is already in the teamMembers array
      const isAlreadyInTeam = teamMembers.some((member) => member._id === value._id);
  
      if (!isAlreadyInTeam) {
        // Add the selected user to the teamMembers array
        setTeamMembers((prevTeam) => [...prevTeam, value]);
      }
    }
  }

  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  const handleGetRepos = useCallback(async () => {
    if (session?.access) {
      try {
        const res = await fetch("https://api.github.com/user/repos", {
          headers: {
            Authorization: `token ${session?.access}`,
          },
        });
        if (!res.ok) {
          throw new Error("Error fetching repositories");
        }
        const data = await res.json();
        setRepos(data ?? []);
      } catch (error) {
        console.error(error);
      }
    }
  }, [session?.access]);

  const handleToggleTrack = (track: string) => {
    setFormData((prevData) => {
      const isSelected = prevData.tracks.includes(track);
      const updatedTracks = isSelected
        ? prevData.tracks.filter((t) => t !== track)
        : [...prevData.tracks, track];

      return { ...prevData, tracks: updatedTracks };
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as string;
    // Execute your function with the selected value
    setFormData({ ...formData, github: selectedValue });
  };

  useEffect(() => {
    handleGetRepos();
  }, [handleGetRepos]);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Project Info</Typography>
            {formData.projectPicture && (
              <Box display="flex" justifyContent="center">
              <div className="flex h-[150px] w-[150px] items-center justify-center overflow-hidden">
                  <img
                    src={URL.createObjectURL(formData.projectPicture)}
                    className="max-h-full max-w-full object-contain"
                  />
              </div>
            </Box>
            )}
            <Button variant="contained" component="label">
              Upload Project / Team Picture
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>

            <TextField
              name="name"
              label="Project Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.name}
            />
            <TextField
              name="shortDescription"
              label="Short Description"
              value={formData.shortDescription}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
              required
              error={errors.shortDescription}
            />
            <TextField
              name="comment"
              label="What did you think of the Hackathon?"
              value={formData.comment}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
              required
              error={errors.comment}
            />
          </Box>
        );
      case 1:
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Project Details</Typography>
            <TextField
              name="description"
              label="Project Description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={10}
              fullWidth
              required
              error={errors.description}
            />
            <TextField
              name="videoLink"
              label="Video Demo Link"
              value={formData.videoLink}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.videoLink}
            />
            <Select
              sx={{
                width: "100%",
                padding: "0rem",
              }}
              name="github"
              id="github"
              displayEmpty
              defaultValue={formData.github}
              required
              error={errors.github}
              onChange={handleSelectChange}
            >
              {/* Placeholder option */}
              <MenuItem disabled value="">
                <em>Select a GitHub Link</em>
              </MenuItem>
            {repos.map((item) => (
                <MenuItem
                  sx={{ paddingLeft: ["0rem"] }}
                  className="!bg-white"
                  key={item.id}
                  value={item.html_url}
                >
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      {item.full_name}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
            
            <br></br>
            <Typography variant="h6">Tracks</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {_event?.tracks.map((track) => (
                <Chip
                  key={track}
                  label={track}
                  clickable
                  variant={formData.tracks.includes(track) ? "filled" : "outlined"}
                  color={formData.tracks.includes(track) ? "primary" : "default"}
                  onClick={() => handleToggleTrack(track)}
                />
              ))}
            </Box>
              <br></br>

            <Typography variant="h6">Team</Typography>
            <Autocomplete
              options={userList}
              getOptionLabel={(option) => option.name} // Display the user's name in the dropdown
              filterOptions={(options, { inputValue }) =>
                options.filter((option) =>
                  option.name.toLowerCase().includes(inputValue.toLowerCase())
                )
              }
              value={null} // To clear the selected value when a new search begins
              onChange={handleTeamSelect}
              onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
              renderInput={(params) => (
                <TextField {...params} label="Find a team member" variant="outlined" fullWidth />
              )}
            />
            <Box sx={{ mt: 2 }}>
              {teamMembers.map((member, index) => (
                <div>
                  <TeamMemberCard
                    key={index}
                    member={member}
                    onRemove={index !== 0 ? () => handleRemoveTeamMember(index) : undefined}
                  />
                  <br></br>
                </div>
              ))}
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box display="flex" flexDirection="column" gap={3} sx={{ padding: 4, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Project Preview
            </Typography>
      
            {/* Project Picture */}
            {formData.projectPicture && (
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src={URL.createObjectURL(formData.projectPicture)}
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
              <Typography variant="h6" gutterBottom>Project Info</Typography>
              <Typography><strong>Name:</strong> {formData.name}</Typography>
              <Typography><strong>Short Description:</strong> {formData.shortDescription}</Typography>
              <Typography><strong>Description:</strong> {formData.description}</Typography>
            </Box>
      
            {/* Additional Details */}
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Additional Details</Typography>
              <Typography><strong>Comment:</strong> {formData.comment}</Typography>
              <Typography><strong>Video Link:</strong> {formData.videoLink}</Typography>
            </Box>
      
            {/* GitHub Link */}
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>GitHub Repository</Typography>
              <Typography component="a" href={formData.github} target="_blank" rel="noopener noreferrer" color="primary">
                {formData.github}
              </Typography>
            </Box>
      
            {/* Tracks */}
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Tracks</Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {formData.tracks.map((track, index) => (
                  <Chip key={index} label={track} color="primary" />
                ))}
              </Box>
            </Box>
      
            {/* Team Members */}
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Team Members</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {teamMembers.map((member, index) => (
                  <Box key={index} display="flex" flexDirection="column" p={2} sx={{ border: '1px solid #ddd', borderRadius: 1 }}>
                    <Typography variant="body1"><strong>Name:</strong> {member ? member.name : ""}</Typography>
                    <Typography variant="body2" color="textSecondary"><strong>Email:</strong> {member ? member.email : ""}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <CheckCircleOutline sx={{ fontSize: 64, color: "green" }} />
            <Typography variant="h5" align="center">
              Submission Successful!
            </Typography>
            <Typography variant="body1" align="center">
              Your project has been uploaded successfully.
            </Typography>
          </Box>
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Box sx={{ width: "50%", margin: "auto", padding: 4 }}>
      {/* Stepper Header */}
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <form onSubmit={handleSetTeam}>
        <Box sx={{ marginTop: 4 }}>{renderStepContent()}</Box>

        {/* Navigation Buttons */}
        {(step < steps.length - 1) && (<Box
          display="flex"
          justifyContent="space-between"
          sx={{ marginTop: 4 }}
        >
          {step > 0 && (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < steps.length - 2 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={handleSubmit}
                startIcon={
                  isSubmitting ? <CircularProgress size={20} /> : undefined
                }
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
          )}
        </Box>)}
      </form>
      <br></br>
      <br></br>
        { getErrorMessage() && (
                <Box mb={2} p={1} borderRadius={1} color="white">
                  <Typography variant="subtitle2">
                    {getErrorMessage()}
                  </Typography>
                </Box>
              )}
    </Box>
  );
};

export default StepperForm;
