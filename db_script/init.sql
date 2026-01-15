-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2026 at 05:43 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_test_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `content`) VALUES
(2, 1, 'Play counter strike', 'game kassssssk'),
(3, 1, 'หาเพื่อนเล่นเกม', 'game kak'),
(4, 1, 'หาเพื่อนเล่นเกม', 'game kak');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_online` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `is_active`, `is_online`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(1, 'user1', '$2b$10$mxkpUXd7jVdz8kijba9vz.x2VJHzfy63qKyT3Ufwya9adThc5Nu72', 'user1@gmail.com', 'user', 'user', 1, 1, '2026-01-06 06:09:12', NULL, '2026-01-07 07:35:52', NULL),
(3, 'user2', '$2b$10$1TxZbLIxI0UbGY3CFG.cAe.SBaeEbKRyBS4gU7loSXnR./7x.w4aK', 'user2@gmail.com', 'userx', 'userx', 1, 0, '2026-01-06 06:16:10', NULL, '2026-01-06 07:03:03', NULL),
(4, 'user3', '$2b$10$VVWB9xoTdqTnyymC38ndYeLjlh452TlU.3UGJP.wk5twkAQYWVjIy', 'user3@gmail.com', 'test', 'xxxxxx', 1, 0, '2026-01-06 08:29:19', NULL, '2026-01-06 08:29:19', NULL),
(5, 'user4', '$2b$10$KkqDgQPuwEzA5OdT3tEfAuS/1MdzU9EouZfvOoirNzosXFf/IVkEG', 'user4@gmail.com', 'testxxxx', 'xxxxxx', 1, 0, '2026-01-07 07:24:11', NULL, '2026-01-07 07:24:11', NULL),
(6, 'user5', '$2b$10$h/l.FyhkFAO/fmOARpb31eNZQ8h28rmjctyRGe/jDD4Y9CYqj5T.y', 'user48@gmail.com', 'testwwwww', 'xxxxxxwwww', 1, 1, '2026-01-15 03:45:21', NULL, '2026-01-15 04:29:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_tokens`
--

CREATE TABLE `user_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `refresh_token` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expired_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tokens`
--

INSERT INTO `user_tokens` (`id`, `user_id`, `refresh_token`, `created_at`, `expired_at`) VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4MzcxMCwiZXhwIjoxNzY4Mjg4NTEwfQ.Z83n-pOKB7qYK5rXVEf7S_ODCD9hZ8UKhBzHXRL1rbg', '2026-01-06 07:15:10', '0000-00-00 00:00:00'),
(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4Mzc1OCwiZXhwIjoxNzY4Mjg4NTU4fQ.76IgOg1hvxU9IYYukD2MgO7FJ8aPEcd-iPZjnAy0JDo', '2026-01-06 07:15:58', '0000-00-00 00:00:00'),
(3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NDM3MCwiZXhwIjoxNzY4Mjg5MTcwfQ.T4nxM9o5b2kQzawXJZAZKskiEajJOIV7uUfV9oDZGFA', '2026-01-06 07:26:10', '2026-01-13 14:26:10'),
(4, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NTA2NywiZXhwIjoxNzY4Mjg5ODY3fQ.9RO2XgcjFsBUX9ovyKoZDquaWSX-_vDL-zQsLjGjx4Y', '2026-01-06 07:37:47', '2026-01-13 14:37:47'),
(5, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NTA5MiwiZXhwIjoxNzY4Mjg5ODkyfQ.VTvUGqY3ESZEHg3Yk4WTSA4yCpBp0vOCL7U7ASN-_XQ', '2026-01-06 07:38:12', '2026-01-13 14:38:12'),
(6, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NTEzOSwiZXhwIjoxNzY4Mjg5OTM5fQ.5hp72o5yV2jCp9IOCkZI4L0ZAB3-owfaZ2AfAAx5jNo', '2026-01-06 07:38:59', '2026-01-13 14:38:59'),
(7, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NTIzMywiZXhwIjoxNzY4MjkwMDMzfQ.Oj2FOSWN_qlIwbZ9EE9QMgaMeygZOzaB1b0WT5gJIqQ', '2026-01-06 07:40:33', '2026-01-13 14:40:33'),
(8, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NTMyNSwiZXhwIjoxNzY4MjkwMTI1fQ.RjeC-b_URWyW8yzTLZ1qDMHh5AAFf0g41jpf91fjX1k', '2026-01-06 07:42:05', '2026-01-13 14:42:05'),
(10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NzI3MywiZXhwIjoxNzY4MjkyMDczfQ.t1R4vOhKC9LWE7p1OoK-sOBr6_KWvWJkJBWsuUq_-9o', '2026-01-06 08:14:33', '2026-01-13 15:14:33'),
(11, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NzQ4NywiZXhwIjoxNzY4MjkyMjg3fQ.sNyweZgWCQIuGbDDeZEwlsfCaDOxhBVzpJ6FskHzCkw', '2026-01-06 08:18:07', '2026-01-13 15:18:07'),
(12, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NzQ4OCwiZXhwIjoxNzY4MjkyMjg4fQ.ePXHcqbXlX3bV6AcS1F-a0SxM3EKPAdiwQ3GEz8iGAE', '2026-01-06 08:18:08', '2026-01-13 15:18:08'),
(13, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3Njc2ODc0OTIsImV4cCI6MTc2ODI5MjI5Mn0.9Gxn_9xfdNJEf5s1EKxdY5RSZS0AN2PUFMkhPLooDks', '2026-01-06 08:18:12', '2026-01-13 15:18:12'),
(14, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NzUyNCwiZXhwIjoxNzY4MjkyMzI0fQ.yKHQnpalTPq7bo990LFYEYtXa4ZsL3zjG-lgjfmmKrI', '2026-01-06 08:18:44', '2026-01-13 15:18:44'),
(15, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NzUyNSwiZXhwIjoxNzY4MjkyMzI1fQ.QbA5Z20URNpfYz18ltPJmF_sFHVzAjhFXm_q_nopUXA', '2026-01-06 08:18:45', '2026-01-13 15:18:45'),
(16, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NzUzOCwiZXhwIjoxNzY4MjkyMzM4fQ.muTRge1fPfgfNtpYUWuevaJMj2QXi3leBxH8Betc7_c', '2026-01-06 08:18:58', '2026-01-13 15:18:58'),
(17, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3Njc2ODc1NDEsImV4cCI6MTc2ODI5MjM0MX0.jiI38IyLkGymMX2c57P-0RQo_7VuJmKjuU7ATnKw9J8', '2026-01-06 08:19:01', '2026-01-13 15:19:01'),
(18, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NzY0OCwiZXhwIjoxNzY4MjkyNDQ4fQ.NbEz4_LBPClv0PmHiEYj5T52g308LPjFYr5kkd7cezE', '2026-01-06 08:20:48', '2026-01-13 15:20:48'),
(19, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NzY0OSwiZXhwIjoxNzY4MjkyNDQ5fQ.8u-AxLIITzshqbkyeOEifB8XS9DWT_IkPf1vFD6J7Ps', '2026-01-06 08:20:49', '2026-01-13 15:20:49'),
(20, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY4NzY2NiwiZXhwIjoxNzY4MjkyNDY2fQ.0jnPq_bpdcQEEdAx_zw0BusPq7qyUYAlGPA7Oo1k1c0', '2026-01-06 08:21:06', '2026-01-13 15:21:06'),
(22, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJpYXQiOjE3Njc2ODkyOTQsImV4cCI6MTc2ODI5NDA5NH0.4YfY-Pz5OUCd1_wHCKlcDvLw5nkljapyXribcWvxnAU', '2026-01-06 08:48:14', '2026-01-13 15:48:14'),
(24, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJpYXQiOjE3Njc3NTA0NDcsImV4cCI6MTc2ODM1NTI0N30.IaeqQrZbL50B-ZemTf6XefCKZMdpmPcDdl18M_o72lU', '2026-01-07 01:47:27', '2026-01-14 08:47:27'),
(25, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJpYXQiOjE3Njc3NTA5ODMsImV4cCI6MTc2ODM1NTc4M30.XSf3V_zuXJMxgopbz30D-wDlwfE4_yxO2918ycnurBU', '2026-01-07 01:56:23', '2026-01-14 08:56:23'),
(26, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJpYXQiOjE3Njc3NTEwMjAsImV4cCI6MTc2ODM1NTgyMH0.8rvzLU79HyrDgTTrhtFI1p61Iy1-wF4GvqgpRdCw9w0', '2026-01-07 01:57:00', '2026-01-14 08:57:00'),
(27, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc1MjczOCwiZXhwIjoxNzY4MzU3NTM4fQ.dyKvdaLTX5H_1rNQIZst1lwpX1Ypzv6MZGG2tv0tXyI', '2026-01-07 02:25:38', '2026-01-14 09:25:38'),
(28, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc1Mjk4NywiZXhwIjoxNzY4MzU3Nzg3fQ.pE33cbjCmCjDq3xXG7WLpIbLeq34FQQwKbs3efo4AM8', '2026-01-07 02:29:47', '2026-01-14 09:29:47'),
(29, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc1NTgzMiwiZXhwIjoxNzY4MzYwNjMyfQ.Fpe6jrikrWiJErXBtKB8NGDl_Yh4MQWGvV3dQ-McskY', '2026-01-07 03:17:12', '2026-01-14 10:17:12'),
(30, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc1NzM1MCwiZXhwIjoxNzY4MzYyMTUwfQ.SudQb4l57Y8J_tkw7iX1opXRHpbkzZfE8wFKYUXU_b4', '2026-01-07 03:42:30', '2026-01-14 10:42:30'),
(31, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc2MDE5NiwiZXhwIjoxNzY4MzY0OTk2fQ.hB1neRnlf31WKflVojfg1E2K2xngEzPxEwtK9R1gbAQ', '2026-01-07 04:29:56', '2026-01-14 11:29:56'),
(32, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc2MTE4MCwiZXhwIjoxNzY4MzY1OTgwfQ.3jExIK_Betl2S_bGq8OHJwUQOgaxQvZKk7TBuAKbK-M', '2026-01-07 04:46:20', '2026-01-14 11:46:20'),
(33, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc2NjM1NywiZXhwIjoxNzY4MzcxMTU3fQ.7NQJq8-hYMa0FTD5qtRVOoyviWqVkR7WkT60Hzil1Ic', '2026-01-07 06:12:37', '2026-01-14 13:12:37'),
(34, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc2NjQwNSwiZXhwIjoxNzY4MzcxMjA1fQ.Mqidd1dtImgFYXMeSjIiWL4Po8Id-K9ibW6uJKGy2gU', '2026-01-07 06:13:25', '2026-01-14 13:13:25'),
(35, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc2NjQyMiwiZXhwIjoxNzY4MzcxMjIyfQ.ijtc4MLQs4ITR2QwjZuJ3Fm5u9eFLcy2-aI2PGRXPIs', '2026-01-07 06:13:42', '2026-01-14 13:13:42'),
(36, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc2ODEyMCwiZXhwIjoxNzY4MzcyOTIwfQ.3as1i-AqHS5pn3t1MAY_bQpb4LqoTXFwFQcIWS4uvxw', '2026-01-07 06:42:00', '2026-01-14 13:42:00'),
(37, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc2ODk2NywiZXhwIjoxNzY4MzczNzY3fQ.Bkwp1T4ghFY-VmsdceqOWFb1fwAHuNdwqTD0H5yyntI', '2026-01-07 06:56:07', '2026-01-14 13:56:07'),
(38, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc3MDM5OSwiZXhwIjoxNzY4Mzc1MTk5fQ.N3m9wgpLRluU3Y0IqJDDiJihXGa5oHZHpOU3RhO9tyg', '2026-01-07 07:19:59', '2026-01-14 14:19:59'),
(40, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc3MTM1MiwiZXhwIjoxNzY4Mzc2MTUyfQ.3H3KWF0eub1k0hHKAe5DlbLCf89mRqoUNS6UIS7tXqM', '2026-01-07 07:35:52', '2026-01-14 14:35:52'),
(41, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc3MzE3NSwiZXhwIjoxNzY4Mzc3OTc1fQ.GfZSWNnitr9enm9vRLQEVdf5e3IwmbG2dCa9Scj97A8', '2026-01-07 08:06:15', '2026-01-14 15:06:15'),
(42, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzc3NTIzNSwiZXhwIjoxNzY4MzgwMDM1fQ.cY5RcXOl3J3v9IeCbzEJdU6YD1Jj6v99CR7RrI6lhrY', '2026-01-07 08:40:35', '2026-01-14 15:40:35'),
(43, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6InVzZXIiLCJsYXN0TmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2Nzg0MzM1NCwiZXhwIjoxNzY4NDQ4MTU0fQ.XPnuFCpZm62CdhknwJji1UhdeaAvo7P9YgTkoGRAhyY', '2026-01-08 03:35:54', '2026-01-15 03:35:54'),
(44, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImZpcnN0TmFtZSI6InRlc3R3d3d3dyIsImxhc3ROYW1lIjoieHh4eHh4d3d3dyIsImVtYWlsIjoidXNlcjQ4QGdtYWlsLmNvbSIsImlhdCI6MTc2ODQ1MTM0OCwiZXhwIjoxNzY5MDU2MTQ4fQ.qcwh_uOoM-tKVlsDdVD8JdXmyo_bhQzG6R9FiAe9gsU', '2026-01-15 04:29:08', '2026-01-22 11:29:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_tokens`
--
ALTER TABLE `user_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
