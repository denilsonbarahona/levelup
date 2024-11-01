import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles'

const steps = ["Profile Info", "Project Details", "Preview"];

interface FormData {
  profilePicture: File | null;
  name: string;
  description: string;
  comment: string;
  projectInfo: string;
  videoLink: string;
}

const StepperForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    profilePicture: null,
    name: "",
    description: "",
    comment: "",
    projectInfo: "",
    videoLink: "",
  });
  const [file, setFile] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    }
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate a submission process
    setTimeout(() => {
      alert("Form Submitted!");
      setIsSubmitting(false);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Personal Info</Typography>
            <div className="flex justify-center items-center h-[150px] w-[150px] overflow-hidden">
                {formData.profilePicture && (
                    <img
                        src={URL.createObjectURL(formData.profilePicture)}
                        className="max-h-full max-w-full object-contain"
                    />
                )}
            </div>

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
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              name="comment"
              label="What did you think of the Hackathon?"
              value={formData.comment}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Project Details</Typography>
            <TextField
              name="projectInfo"
              label="Project Info"
              value={formData.projectInfo}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              name="videoLink"
              label="Video Demo Link"
              value={formData.videoLink}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        );
      case 2:
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Preview</Typography>
            <Typography>Name: {formData.name}</Typography>
            <Typography>Description: {formData.description}</Typography>
            <Typography>Comment: {formData.comment}</Typography>
            <Typography>Project Info: {formData.projectInfo}</Typography>
            <Typography>Video Link: {formData.videoLink}</Typography>
            {formData.profilePicture && (
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                alt="Profile"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </Box>
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  const stepperTheme = createTheme({
    components: {
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                },
            },
        },
    },
  });

  return (
    // <ThemeProvider theme={stepperTheme}>
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
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginTop: 4 }}>{renderStepContent()}</Box>

        {/* Navigation Buttons */}
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ marginTop: 4 }}
        >
          {step > 0 && (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? <CircularProgress size={20} /> : undefined
              }
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </Box>
      </form>
    </Box>
    // </ThemeProvider>
  );
};

export default StepperForm;