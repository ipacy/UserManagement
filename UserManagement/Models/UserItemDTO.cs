﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagement.Models
{
    public class UserItemDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public long Id { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
    }
}